<?php

declare(strict_types=1);

namespace Model\Messaging;

use Domain\Messaging\Constraint as MessagingConstraint;
use Symfony\Component\Validator\Constraints as Assert;

class CreateConversationDTO
{
    #[Assert\Uuid]
    #[MessagingConstraint\ConversationCreation]
    private string $userId = '';

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function setUserId(string $userId): void
    {
        $this->userId = $userId;
    }
}
