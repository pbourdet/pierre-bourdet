<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Account\GetMeController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Model\User\CreateUserDTO;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation as Serializer;
use Symfony\Component\Uid\Uuid;

#[
    ORM\Table(name: 'app_user'),
    ORM\Entity(repositoryClass: UserRepository::class),
    ApiResource(
        collectionOperations: [
            'get' => [
                'normalization_context' => [
                    'groups' => ['get_users'],
                ],
            ],
            'post' => [
                'input' => CreateUserDTO::class,
                'normalization_context' => [
                    'groups' => ['get_user'],
                ],
                'openapi_context' => [
                    'security' => [],
                ],
            ],
        ],
        itemOperations: [
            'get' => [
               'normalization_context' => [
                   'groups' => ['get_user'],
               ],
            ],
            'delete',
            'getMe' => [
                'method' => Request::METHOD_GET,
                'normalization_context' => [
                    'groups' => ['get_me'],
                ],
                'path' => GetMeController::PATH,
                'identifiers' => [],
                'controller' => GetMeController::class,
                'read' => false,
                'openapi_context' => [
                    'tags' => ['Account'],
                    'summary' => 'Retrieves current user resource.',
                    'description' => 'Retrieves current user resource.',
                    'parameters' => [],
                    'responses' => [
                        Response::HTTP_UNAUTHORIZED => [
                            'description' => 'Unauthenticated user',
                            'content' => [
                                'application/json' => [],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        formats: ['json'],
    )
]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[
        ORM\Id,
        ORM\Column(type: 'uuid'),
        Serializer\Groups(groups: ['get_users', 'get_user', 'get_me'])
    ]
    private Uuid $id;

    #[
        ORM\Column(type: 'datetime'),
        Serializer\Groups(groups: ['get_me', 'get_user'])
    ]
    private \DateTimeInterface $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[
        ORM\Column(type: 'string', length: 180, unique: true),
        Serializer\Groups(groups: ['get_me'])
    ]
    private string $email = '';

    /** @var string[] */
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column(type: 'string')]
    private string $password = '';

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Todo::class, orphanRemoval: true)]
    private Collection $todos;

    #[
        ORM\Column(type: 'string', length: 255),
        Serializer\Groups(groups: ['get_me', 'get_user', Game::READ_COLLECTION_TOP_GROUP])
    ]
    private string $nickname = '';

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $resetPasswordToken = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $resetPasswordExpirationDate = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $language = '';

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Game::class, orphanRemoval: true)]
    private Collection $games;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->todos = new ArrayCollection();
        $this->games = new ArrayCollection();
        $this->id = Uuid::v4();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    //For tests purposes
    public function setId(Uuid $id): void
    {
        $this->id = $id;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function hasBeenUpdated(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param string[] $roles
     */
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Todo>
     */
    public function getTodos(): Collection
    {
        return $this->todos;
    }

    public function addTodo(Todo $todo): self
    {
        if (!$this->todos->contains($todo)) {
            $this->todos[] = $todo;
            $todo->setUser($this);
        }

        return $this;
    }

    public function removeTodo(Todo $todo): self
    {
        if ($this->todos->contains($todo)) {
            $this->todos->removeElement($todo);
        }

        return $this;
    }

    public function getNickname(): string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getResetPasswordToken(): ?string
    {
        return $this->resetPasswordToken;
    }

    public function setResetPasswordToken(?string $resetPasswordToken): void
    {
        $this->resetPasswordToken = $resetPasswordToken;
    }

    public function getResetPasswordExpirationDate(): ?\DateTimeInterface
    {
        return $this->resetPasswordExpirationDate;
    }

    public function setResetPasswordExpirationDate(?\DateTimeInterface $resetPasswordExpirationDate): void
    {
        $this->resetPasswordExpirationDate = $resetPasswordExpirationDate;
    }

    public function isResetPasswordTokenExpired(): bool
    {
        return null !== $this->resetPasswordExpirationDate && $this->resetPasswordExpirationDate < new \DateTime();
    }

    public function eraseResetPasswordData(): void
    {
        $this->resetPasswordExpirationDate = null;
        $this->resetPasswordToken = null;
    }

    public function getLanguage(): string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getGames(): Collection
    {
        return $this->games;
    }

    public function addGame(Game $game): self
    {
        if (!$this->games->contains($game)) {
            $this->games[] = $game;
            $game->setUser($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->games->contains($game)) {
            $this->games->removeElement($game);
        }

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->getUsername();
    }
}
