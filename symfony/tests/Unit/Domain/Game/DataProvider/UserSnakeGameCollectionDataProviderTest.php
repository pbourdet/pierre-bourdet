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

    /** @dataProvider dataSupports */
    public function testSupports(string $resourceClass, string $operationName, bool $expected): void
    {
        $actual = $this->testedObject->supports($resourceClass, $operationName);

        $this->assertSame($actual, $expected);
    }

    public function dataSupports(): array
    {
        return [
            'case unsupported class' => [
                'resourceClass' => User::class,
                'operationName' => SnakeGame::USER_GAMES_OPERATION_NAME,
                'expected' => false,
            ],
            'case unsupported operation' => [
                'resourceClass' => SnakeGame::class,
                'operationName' => 'operation',
                'expected' => false,
            ],
            'case supported' => [
                'resourceClass' => SnakeGame::class,
                'operationName' => SnakeGame::USER_GAMES_OPERATION_NAME,
                'expected' => true,
            ],
        ];
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
