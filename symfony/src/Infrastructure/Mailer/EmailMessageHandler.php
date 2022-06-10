<?php

declare(strict_types=1);

namespace Infrastructure\Mailer;

use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Contracts\Translation\LocaleAwareInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class EmailMessageHandler implements MessageHandlerInterface
{
    /** @param TranslatorInterface&LocaleAwareInterface $translator */
    public function __construct(
        private readonly MailerInterface $mailer,
        private readonly TranslatorInterface $translator,
        private readonly LoggerInterface $logger
    ) {
    }

    public function __invoke(EmailMessage $emailMessage): void
    {
        $locale = $emailMessage->getLocale();

        if (null !== $locale) {
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
