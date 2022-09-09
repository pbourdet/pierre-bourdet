<?php

declare(strict_types=1);

namespace Model\Messaging\Exception;

class InvalidConversationException extends \DomainException
{
    public function __construct(string $conversationId, string $userId)
    {
        parent::__construct(sprintf(
            'The conversation "%s" only has 1 participant : "%s"',
            $conversationId,
            $userId,
        ));
    }
}
