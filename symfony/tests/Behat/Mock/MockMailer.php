<?php

declare(strict_types=1);

namespace Tests\Behat\Mock;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bridge\Twig\Mime\WrappedTemplatedEmail;
use Symfony\Component\Mailer\Envelope;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\RawMessage;
use Tests\Behat\Context\MailerContext;
use Twig\Environment;

final class MockMailer implements MailerInterface
{
    public function __construct(
        private readonly Environment $twig,
    ) {
    }

    /** @param Email $message */
    public function send(RawMessage $message, Envelope $envelope = null): void
    {
        if ($message instanceof TemplatedEmail) {
            $vars = array_merge($message->getContext(), [
                'email' => new WrappedTemplatedEmail($this->twig, $message),
            ]);

            $message->html($this->twig->render((string) $message->getHtmlTemplate(), $vars));
        }

        MailerContext::addMEmail($message);
    }
}
