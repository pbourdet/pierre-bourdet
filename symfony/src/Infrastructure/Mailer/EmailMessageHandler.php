<?php

declare(strict_types=1);

namespace Infrastructure\Mailer;

use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Contracts\Translation\TranslatorInterface;

class EmailMessageHandler implements MessageHandlerInterface
{
    public function __construct(
        private MailerInterface $mailer,
        private TranslatorInterface $translator,
        private LoggerInterface $logger
    ) {
    }

    public function __invoke(EmailMessage $emailMessage): void
    {
        $locale = $emailMessage->getLocale();

        if (null !== $locale) {
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
