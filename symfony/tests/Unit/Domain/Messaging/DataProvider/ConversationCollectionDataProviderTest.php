<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Messaging\DataProvider;

use App\Entity\Conversation;
use App\Entity\Participant;
use App\Entity\User;
use Domain\Messaging\DataProvider\ConversationCollectionDataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class ConversationCollectionDataProviderTest extends TestCase
{
    private MockObject|Security $security;

    private ConversationCollectionDataProvider $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->createMock(Security::class);

        $this->testedObject = new ConversationCollectionDataProvider(
            $this->security
        );
    }

    /** @dataProvider dataSupports */
    public function testSupportsNormalization(string $resourceClass, bool $expected): void
    {
        $this->assertSame($expected, $this->testedObject->supports($resourceClass));
    }

    public function dataSupports(): array
    {
        return [
            'case wrong class' => [
                'resourceClass' => Participant::class,
                'expected' => false,
            ],
            'case Conversation' => [
                'data' => Conversation::class,
                'expected' => true,
            ],
        ];
    }

    public function testGetCollection(): void
    {
        $user = new User();
        $conversation = new Conversation();
        $conversation2 = new Conversation();
        $participant = new Participant();
        $participant2 = new Participant();
        $user->addParticipant($participant);
        $user->addParticipant($participant2);
        $conversation->addParticipant($participant);
        $conversation2->addParticipant($participant2);

        $this->security->method('getUser')->willReturn($user);

        $actual = $this->testedObject->getCollection('class');

        $this->assertCount(2, $actual);
        $this->assertEquals([$conversation, $conversation2], $actual);
    }
}
