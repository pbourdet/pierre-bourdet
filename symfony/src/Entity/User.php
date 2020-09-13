<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *     itemOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"get_user"}}
 *         },
 *         "delete"
 *     },
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"get_users"}}
 *         },
 *         "post"={
 *             "normalization_context"={"groups"={"get_user"}}
 *         }
 *     }
 * )
 */
class User implements UserInterface
{
    use ResourceId;
    use Timestampable;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"get_user", "get_users"})
     * @Assert\Email()
     * @Assert\NotBlank()
     */
    private string $email;

    /**
     * @var string[]
     * @ORM\Column(type="json")
     */
    private array $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\Length(min="4")
     * @Assert\NotBlank()
     */
    private string $password;

    /**
     * @var Collection<int, Todo>
     *
     * @ORM\OneToMany(targetEntity=Todo::class, mappedBy="user", orphanRemoval=true)
     */
    private Collection $todos;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get_user"})
     * @Assert\Regex(pattern="/^[a-zA-Z0-9]{3}/")
     * @Assert\Length(max="15")
     */
    private string $nickname;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->todos = new ArrayCollection();
    }

    public function getEmail(): ?string
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
}
