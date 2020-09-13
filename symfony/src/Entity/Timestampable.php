<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait Timestampable
{
    /**
     * @ORM\Column(type="datetime")
     * @Groups({"get_user", "get_users"})
     */
    private \DateTimeInterface $createdAt;
    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"get_user"})
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
}
