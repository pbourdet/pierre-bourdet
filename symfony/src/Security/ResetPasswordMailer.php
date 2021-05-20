<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class ResetPasswordMailer
{
    private const MAIL_SUBJECT = [
        'fr' => 'Mot de passe oublié',
        'en' => 'Forgotten password',
    ];

    private MailerInterface $mailer;

    private string $frontendDomain;

    private string $contactEmail;

    private string $contactName;

    public function __construct(
        MailerInterface $mailer,
        string $frontendDomain,
        string $contactEmail,
        string $contactName
    ) {
        $this->mailer = $mailer;
        $this->frontendDomain = $frontendDomain;
        $this->contactEmail = $contactEmail;
        $this->contactName = $contactName;
    }

    public function send(User $user, string $token, string $locale): void
    {
        $templateMail = (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail, $this->contactName))
            ->subject(self::MAIL_SUBJECT[$locale])
            ->htmlTemplate('email/reset-password.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'link' => sprintf('%s/reset-password/%s', $this->frontendDomain, $token),
            ]);

        $this->mailer->send($templateMail);
    }
}
