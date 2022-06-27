<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Game\DataProvider;

use App\Entity\SnakeGame;
use App\Entity\User;
use Domain\Game\DataProvider\UserSnakeGameCollectionDataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class UserSnakeGameCollectionDataProviderTest extends TestCase
{
    private MockObject|Security $security;

    private UserSnakeGameCollectionDataProvider $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new UserSnakeGameCollectionDataProvider(
            $this->security
        );
    }

    public function testGetCollection(): void
    {
        $games = [
            (new SnakeGame())->setScore(2),
            (new SnakeGame())->setScore(100),
        ];

        $user = $this->createMock(User::class);
        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $user->expects($this->once())->method('getGamesByType')->with(SnakeGame::class)->willReturn($games);

        $actual = $this->testedObject->getCollection(SnakeGame::class);

        $this->assertIsArray($actual);
        $this->assertCount(2, $actual);
    }
}
