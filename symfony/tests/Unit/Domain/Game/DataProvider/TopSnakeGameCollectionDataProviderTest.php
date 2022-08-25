<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Game\DataProvider;

use App\Entity\SnakeGame;
use App\Entity\User;
use App\Repository\GameRepository;
use Domain\Game\DataProvider\TopSnakeGameCollectionDataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class TopSnakeGameCollectionDataProviderTest extends TestCase
{
    private MockObject|GameRepository $gameRepository;

    private TopSnakeGameCollectionDataProvider $testedObject;

    protected function setUp(): void
    {
        $this->gameRepository = $this->createMock(GameRepository::class);

        $this->testedObject = new TopSnakeGameCollectionDataProvider(
            $this->gameRepository
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
                'operationName' => SnakeGame::TOP_GAMES_OPERATION_NAME,
                'expected' => false,
            ],
            'case unsupported operation' => [
                'resourceClass' => SnakeGame::class,
                'operationName' => 'operation',
                'expected' => false,
            ],
            'case supported' => [
                'resourceClass' => SnakeGame::class,
                'operationName' => SnakeGame::TOP_GAMES_OPERATION_NAME,
                'expected' => true,
            ],
        ];
    }
}
