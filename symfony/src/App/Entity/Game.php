<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation as Serializer;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: GameRepository::class)]
#[ORM\InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn(name: 'game_name', type: 'string')]
#[ORM\DiscriminatorMap(['snake' => 'SnakeGame'])]
abstract class Game
{
    public const READ_COLLECTION_TOP_GROUP = 'read:collection:top';
    public const READ_COLLECTION_USER_GROUP = 'read:collection:user';
    public const CREATE_GROUP = 'create';

    #[
        ORM\Id,
        ORM\Column(type: 'uuid'),
    ]
    private Uuid $id;

    #[ORM\Column]
    #[Serializer\Groups(groups: [Game::READ_COLLECTION_TOP_GROUP, Game::READ_COLLECTION_USER_GROUP])]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Serializer\Groups(groups: [
        Game::READ_COLLECTION_TOP_GROUP,
        Game::READ_COLLECTION_USER_GROUP,
        Game::CREATE_GROUP,
    ])]
    #[Assert\GreaterThan(value: 0)]
    private int $score = 0;

    #[ORM\ManyToOne]
    #[Serializer\Groups(groups: [Game::READ_COLLECTION_TOP_GROUP])]
    private User $user;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->id = Uuid::v4();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function setId(Uuid $uuid): self
    {
        $this->id = $uuid;

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getScore(): int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
