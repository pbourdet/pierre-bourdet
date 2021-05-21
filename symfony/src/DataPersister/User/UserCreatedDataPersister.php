<?php

declare(strict_types=1);

namespace App\DataPersister\User;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use App\Mailer\EmailFactory;
use App\Message\EmailMessage;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

final class UserCreatedDataPersister implements ContextAwareDataPersisterInterface
{
    private RequestStack $requestStack;

    private EmailFactory $emailFactory;

    private MessageBusInterface $bus;

    private ContextAwareDataPersisterInterface $decorator;

    private TranslatorInterface $translator;

    public function __construct(
        RequestStack $requestStack,
        EmailFactory $emailFactory,
        MessageBusInterface $bus,
        ContextAwareDataPersisterInterface $decorator,
        TranslatorInterface $translator
    ) {
        $this->requestStack = $requestStack;
        $this->emailFactory = $emailFactory;
        $this->bus = $bus;
        $this->decorator = $decorator;
        $this->translator = $translator;
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
            /** @var Request $request */
            $request = $this->requestStack->getCurrentRequest();
            $locale = $request->getLocale();

            $subject = $this->translator->trans('subject', [], 'user-subscription-email');
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
