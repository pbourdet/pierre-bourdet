<?php

declare(strict_types=1);

namespace Domain\Game\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\SnakeGame;
use App\Repository\GameRepository;

class TopSnakeGameCollectionDataProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{
    public function __construct(
        private GameRepository $gameRepository
    ) {
    }

    /** @param class-string<SnakeGame> $resourceClass */
    public function getCollection(string $resourceClass, string $operationName = null): array
    {
        return $this->gameRepository->getTopFiveGamesByGameType($resourceClass);
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return SnakeGame::class === $resourceClass && SnakeGame::TOP_GAMES_OPERATION_NAME === $operationName;
    }
}
