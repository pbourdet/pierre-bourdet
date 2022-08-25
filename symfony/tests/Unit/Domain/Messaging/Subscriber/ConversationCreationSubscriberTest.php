<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Messaging\Subscriber;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Participant;
use App\Entity\User;
use Domain\Messaging\Subscriber\ConversationCreationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

class ConversationCreationSubscriberTest extends TestCase
{
    private MockObject|HubInterface $hub;

    private MockObject|RouterInterface $router;

    private MockObject|SerializerInterface $serializer;

    private MockObject|Security $security;

    private ConversationCreationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->hub = $this->createMock(HubInterface::class);
        $this->router = $this->createMock(RouterInterface::class);
        $this->serializer = $this->createMock(SerializerInterface::class);
        $this->security = $this->createMock(Security::class);

        $this->testedObject = new ConversationCreationSubscriber(
            $this->hub,
            $this->router,
            $this->serializer,
            $this->security
        );
    }

    /** @dataProvider dataDispatchWithUnsupportedEvent */
    public function testDispatchWithUnsupportedEvent(object $controllerResult, string $method): void
    {
        $request = $this->createMock(Request::class);
        $httpKernel = $this->createMock(HttpKernelInterface::class);
        $request->expects($this->once())->method('getMethod')->willReturn($method);

        $event = new ViewEvent($httpKernel, $request, 1, $controllerResult);

        $this->router
            ->expects($this->never())
            ->method('generate')
            ->withAnyParameters();

        $this->testedObject->dispatchUpdate($event);
    }

    public function dataDispatchWithUnsupportedEvent(): array
    {
        return [
            'case unsupported class' => [
                'controllerResult' => new Message(),
                'method' => Request::METHOD_POST,
            ],
            'case unsupported method' => [
                'controllerResult' => $this->createConversation(),
                'method' => Request::METHOD_DELETE,
            ],
        ];
    }

    public function testDispatchUpdate(): void
    {
        $conversation = $this->createConversation();
        $request = $this->createMock(Request::class);
        $httpKernel = $this->createMock(HttpKernelInterface::class);
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);

        $event = new ViewEvent($httpKernel, $request, 1, $conversation);
        $loggedInUser = $conversation->getParticipants()->first()->getUser();
        $otherParticipantId = $conversation->getOtherParticipant($loggedInUser)->getUser()->getId();

        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($loggedInUser);

        $this->router
            ->expects($this->exactly(2))
            ->method('generate')
            ->withConsecutive(
                ['api_conversations_get_collection', [], UrlGeneratorInterface::ABSOLUTE_URL],
                ['api_users_get_item', ['id' => $otherParticipantId, 'topic' => 'conversationTopic'], UrlGeneratorInterface::ABSOLUTE_URL]
            )
            ->willReturnOnConsecutiveCalls('conversationTopic', 'userTopic');

        $this->serializer
            ->expects($this->once())
            ->method('serialize')
            ->with($conversation, 'json', ['groups' => Conversation::READ_ITEM_GROUP])
            ->willReturn('serializedMessage');

        $this->hub
            ->expects($this->once())
            ->method('publish')
            ->with($this->callback(function (Update $update) {
                return true === $update->isPrivate()
                    && $update->getTopics() === ['conversationTopic', 'userTopic']
                    && 'serializedMessage' === $update->getData();
            }));

        $this->testedObject->dispatchUpdate($event);
    }

    private function createConversation(): Conversation
    {
        $sender = new User();
        $recipient = new User();
        $senderParticipant = new Participant();
        $recipientParticipant = new Participant();
        $conversation = new Conversation();
        $senderParticipant->setUser($sender);
        $recipientParticipant->setUser($recipient);
        $conversation->addParticipant($senderParticipant);
        $conversation->addParticipant($recipientParticipant);

        return $conversation;
    }
}
