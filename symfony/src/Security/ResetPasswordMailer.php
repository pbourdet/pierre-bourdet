<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class ResetPasswordMailer
{
    private MailerInterface $mailer;

    private string $frontendDomain;

    private string $contactEmail;

    public function __construct(
        MailerInterface $mailer,
        string $frontendDomain,
        string $contactEmail
    ) {
        $this->mailer = $mailer;
        $this->frontendDomain = $frontendDomain;
        $this->contactEmail = $contactEmail;
    }

    public function send(User $user, string $token): void
    {
        $templateMail = (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail))
            ->subject('Password forgotten')
            ->htmlTemplate('email/reset-password.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'link' => sprintf('%s/reset-password/%s', $this->frontendDomain, $token),
            ]);

        $this->mailer->send($templateMail);
    }
}
