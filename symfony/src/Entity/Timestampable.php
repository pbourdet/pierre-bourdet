<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait Timestampable
{
    /**
     * @ORM\Column(type="datetime")
     * @Groups({"get_user", "get_me"})
     */
    private \DateTimeInterface $createdAt;
    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\IsNull()
     */
    private ?\DateTimeInterface $updatedAt;

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
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
}
