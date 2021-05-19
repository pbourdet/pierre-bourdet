<?php

declare(strict_types=1);

namespace App\Mailer;

use App\Message\EmailMessage;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Address;

class EmailMessageHandler implements MessageHandlerInterface
{
    private MailerInterface $mailer;

    private LoggerInterface $logger;

    public function __construct(MailerInterface $mailer, LoggerInterface $logger)
    {
        $this->mailer = $mailer;
        $this->logger = $logger;
    }

    public function __invoke(EmailMessage $emailMessage): void
    {
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
