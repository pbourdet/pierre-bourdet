<?php

declare(strict_types=1);

namespace App\Message\Handler;

use App\Message\UserCreatedWelcomeMailMessage;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Address;

class UserCreatedWelcomeMailHandler implements MessageHandlerInterface
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function __invoke(UserCreatedWelcomeMailMessage $welcomeMailMessage): void
    {
        $mail = (new TemplatedEmail())
            ->from('subscription@test.com')
            ->to(new Address($email = $welcomeMailMessage->getEmail()))
            ->subject('Subscription on pierre-bourdet.fr')
            ->htmlTemplate('email/welcome-mail.html.twig')
            ->context([
                'name' => $welcomeMailMessage->getNickname(),
                'emailAddress' => $email,
            ])
        ;

        $this->mailer->send($mail);
    }
}
