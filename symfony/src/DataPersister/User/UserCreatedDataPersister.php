<?php

declare(strict_types=1);

namespace App\DataPersister\User;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use App\Message\UserCreatedWelcomeMailMessage;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\MessageBusInterface;

final class UserCreatedDataPersister implements ContextAwareDataPersisterInterface
{
    private MailerInterface $mailer;

    private MessageBusInterface $bus;

    private ContextAwareDataPersisterInterface $decorator;

    public function __construct(ContextAwareDataPersisterInterface $decorator, MailerInterface $mailer, MessageBusInterface $bus)
    {
        $this->mailer = $mailer;
        $this->bus = $bus;
        $this->decorator = $decorator;
    }

    /** @param mixed $data */
    public function supports($data, array $context = []): bool
    {
        return $this->decorator->supports($data, $context);
    }

    /**
     * @param mixed $data
     *
     * @return mixed
     */
    public function persist($data, array $context = [])
    {
        /** @var User $result */
        $result = $this->decorator->persist($data, $context);

        if ($data instanceof User && 'create' === $context['collection_operation_name']) {
            $this->bus->dispatch(new UserCreatedWelcomeMailMessage($data));
        }

        return $result;
    }

    /** @param mixed $data */
    public function remove($data, array $context = []): void
    {
        $this->decorator->remove($data, $context);
    }
}
