<?php

declare(strict_types=1);

namespace App\Message;

use App\Entity\User;

class UserCreatedWelcomeMailMessage
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getEmail(): string
    {
        return $this->user->getEmail();
    }

    public function getNickname(): string
    {
        return $this->user->getNickname();
    }
}
