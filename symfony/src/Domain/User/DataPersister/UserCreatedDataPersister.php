<?php

declare(strict_types=1);

namespace Domain\User\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use Infrastructure\Mailer\EmailFactory;
use Infrastructure\Mailer\EmailMessage;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

final class UserCreatedDataPersister implements ContextAwareDataPersisterInterface
{
    public function __construct(
        private readonly EmailFactory $emailFactory,
        private readonly MessageBusInterface $bus,
        private readonly ContextAwareDataPersisterInterface $decorator,
        private readonly TranslatorInterface $translator
    ) {
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

        if ($data instanceof User && 'post' === $context['collection_operation_name']) {
            $locale = $data->getLanguage();

            $subject = $this->translator->trans('subject', [], 'user-subscription-email', $locale);
            $email = $this->emailFactory->createForUserSubscription($data, $subject);

            $this->bus->dispatch(new EmailMessage($email, $locale));
        }

        return $result;
    }

    /** @param mixed $data */
    public function remove($data, array $context = []): void
    {
        $this->decorator->remove($data, $context);
    }
}
