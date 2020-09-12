<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

trait ResourceId
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get_user", "get_users"})
     */
    private int $id;

    public function getId(): int
    {
        return $this->id;
    }
}
