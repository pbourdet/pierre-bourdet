<?php

declare(strict_types=1);

namespace Domain\Messaging\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Message;
use Doctrine\ORM\EntityManagerInterface;

class MessageDataPersister implements ContextAwareDataPersisterInterface
{
    public function __construct(
        private EntityManagerInterface $em
    ) {
    }

    public function persist(mixed $data, array $context = []): Message
    {
        /** @var Message $message */
        $message = $data;

        $conversation = $message->getConversation();
        $conversation->setLastMessage($message);

        $this->em->persist($conversation);
        $this->em->flush();

        return $message;
    }

    public function remove(mixed $data, array $context = []): void
    {
    }

    public function supports(mixed $data, array $context = []): bool
    {
        return $data instanceof Message;
    }
}
