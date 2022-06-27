<?php

declare(strict_types=1);

namespace Domain\Game\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\SnakeGame;
use App\Entity\User;
use Symfony\Component\Security\Core\Security;

class UserSnakeGameCollectionDataProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{
    public function __construct(
        private readonly Security $security
    ) {
    }

    /** @return array<SnakeGame> */
    public function getCollection(string $resourceClass, string $operationName = null): array
    {
        /** @var User $user */
        $user = $this->security->getUser();

        return $user->getGamesByType(SnakeGame::class);
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return SnakeGame::class === $resourceClass && SnakeGame::USER_GAMES_OPERATION_NAME === $operationName;
    }
}
