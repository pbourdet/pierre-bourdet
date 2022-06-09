<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Conversation;
use App\Entity\Game;
use App\Entity\SnakeGame;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Game>
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    use EntityManagerTrait;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    /**
     * @param class-string<Game> $gameClassName
     *
     * @return array<SnakeGame>
     */
    public function getTopFiveGamesByGameType(string $gameClassName): array
    {
        /** @var array<SnakeGame> $snakeGames */
        $snakeGames = $this->createQueryBuilder('g')
            ->where('g INSTANCE OF :class')
            ->orderBy('g.score', 'DESC')
            ->setParameter('class', $this->_em->getClassMetadata($gameClassName))
            ->setMaxResults(5)
            ->getQuery()
            ->getResult();

        return $snakeGames;
    }
}
