<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Messaging\Subscriber;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Participant;
use App\Entity\User;
use Domain\Messaging\Subscriber\MessageCreationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Serializer\SerializerInterface;

class MessageCreationSubscriberTest extends TestCase
{
    private MockObject|HubInterface $hub;

    private MockObject|RouterInterface $router;

    private MockObject|SerializerInterface $serializer;

    private MessageCreationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->hub = $this->createMock(HubInterface::class);
        $this->router = $this->createMock(RouterInterface::class);
        $this->serializer = $this->createMock(SerializerInterface::class);

        $this->testedObject = new MessageCreationSubscriber(
            $this->hub,
            $this->router,
            $this->serializer
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
                'controllerResult' => new Conversation(),
                'method' => Request::METHOD_POST,
            ],
            'case unsupported method' => [
                'controllerResult' => $this->createMessage(),
                'method' => Request::METHOD_DELETE,
            ],
        ];
    }

    public function testDispatchUpdate(): void
    {
        $message = $this->createMessage();
        $request = $this->createMock(Request::class);
        $httpKernel = $this->createMock(HttpKernelInterface::class);
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);

        $event = new ViewEvent($httpKernel, $request, 1, $message);
        $conversationId = $message->getConversation()->getId();
        $otherParticipantId = $message->getConversation()->getOtherParticipant($message->getSender()->getUser())->getUser()->getId();

        $this->router
            ->expects($this->exactly(2))
            ->method('generate')
            ->withConsecutive(
                ['api_conversations_get_item', ['id' => $conversationId], UrlGeneratorInterface::ABSOLUTE_URL],
                ['api_users_get_item', ['id' => $otherParticipantId, 'topic' => 'conversationTopic'], UrlGeneratorInterface::ABSOLUTE_URL]
            )
            ->willReturnOnConsecutiveCalls('conversationTopic', 'userTopic');

        $this->serializer
            ->expects($this->once())
            ->method('serialize')
            ->with($message, 'json', ['groups' => Message::CREATE_GROUP])
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

    private function createMessage(): Message
    {
        $message = new Message();
        $sender = new User();
        $recipient = new User();
        $senderParticipant = new Participant();
        $recipientParticipant = new Participant();
        $conversation = new Conversation();
        $senderParticipant->setUser($sender);
        $recipientParticipant->setUser($recipient);
        $conversation->addParticipant($senderParticipant);
        $conversation->addParticipant($recipientParticipant);
        $message->setSender($senderParticipant);
        $message->setConversation($conversation);

        return $message;
    }
}
