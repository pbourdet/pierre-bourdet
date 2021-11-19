<?php

declare(strict_types=1);

namespace Domain\Game\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\SnakeGame;
use App\Entity\User;
use Doctrine\Common\Collections\Criteria;
use Symfony\Component\Security\Core\Security;

class UserSnakeGameCollectionDataProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{
    public function __construct(
        private Security $security
    ) {
    }

    public function getCollection(string $resourceClass, string $operationName = null): array
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $games = $user->getGames()->matching(
            Criteria::create()->orderBy(['score' => Criteria::DESC])
        );

        return $games
            ->filter(function ($game) {
                return $game instanceof SnakeGame;
            })
            ->slice(0, 5);
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return SnakeGame::class === $resourceClass && SnakeGame::USER_GAMES_OPERATION_NAME === $operationName;
    }
}
