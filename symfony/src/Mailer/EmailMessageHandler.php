<?php

declare(strict_types=1);

namespace App\Mailer;

use App\Message\EmailMessage;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Contracts\Translation\TranslatorInterface;

class EmailMessageHandler implements MessageHandlerInterface
{
    private MailerInterface $mailer;

    private TranslatorInterface $translator;

    private LoggerInterface $logger;

    public function __construct(
        MailerInterface $mailer,
        TranslatorInterface $translator,
        LoggerInterface $logger
    ) {
        $this->mailer = $mailer;
        $this->logger = $logger;
        $this->translator = $translator;
    }

    public function __invoke(EmailMessage $emailMessage): void
    {
        if (null !== $locale = $emailMessage->getLocale()) {
            /* @phpstan-ignore-next-line */
            $this->translator->setLocale($locale);
        }

        try {
            $this->mailer->send($emailMessage->getEmail());
        } catch (TransportExceptionInterface $exception) {
            /** @var Address $to */
            $to = current($emailMessage->getEmail()->getTo());

            $this->logger->error(sprintf('Could not send email to %s', $to->toString()), [
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
