<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Model\Todo\PersistTodoDTO;
use App\Repository\TodoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     itemOperations={
 *         "update"={
 *             "method"="PUT",
 *             "input"=PersistTodoDTO::class,
 *             "normalization_context"={"groups"={"persist_todo"}}
 *         },
 *         "delete",
 *         "get"={
 *             "controller"=NotFoundAction::class,
 *             "read"=false,
 *             "output"=false,
 *         },
 *     },
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"get_todos"}}
 *         },
 *         "create"={
 *             "method"="POST",
 *             "input"=PersistTodoDTO::class,
 *             "normalization_context"={"groups"={"persist_todo"}}
 *         },
 *     }
 * )
 * @ORM\Entity(repositoryClass=TodoRepository::class)
 */
class Todo
{
    use ResourceId;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get_todos", "persist_todo"})
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get_todos", "persist_todo"})
     */
    private ?string $description;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"get_todos", "persist_todo"})
     */
    private ?\DateTime $date;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"get_todos", "persist_todo"})
     */
    private bool $isDone = false;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="todos")
     * @ORM\JoinColumn(nullable=false)
     */
    private UserInterface $user;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Todo
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): Todo
    {
        $this->description = $description;

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(?\DateTime $date): Todo
    {
        $this->date = $date;

        return $this;
    }

    public function getIsDone(): bool
    {
        return $this->isDone;
    }

    public function setIsDone(bool $isDone): Todo
    {
        $this->isDone = $isDone;

        return $this;
    }

    public function getUser(): UserInterface
    {
        return $this->user;
    }

    public function setUser(UserInterface $user): Todo
    {
        $this->user = $user;

        return $this;
    }
}
