<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Conversation;
use App\Entity\Todo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Todo>
 * @method Todo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Todo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Todo[]    findAll()
 * @method Todo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TodoRepository extends ServiceEntityRepository
{
    use EntityManagerTrait;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Todo::class);
    }

    /** @return Todo[] */
    public function findNotDoneByReminder(\DateTimeInterface $date): array
    {
        /** @var array<Todo> $todos */
        $todos = $this->createQueryBuilder('t')
            ->where('t.reminder = :date')
            ->andWhere('t.isDone = false')
            ->setParameter('date', $date)
            ->getQuery()
            ->getResult();

        return $todos;
    }
}
