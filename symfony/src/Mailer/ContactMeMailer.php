<?php

declare(strict_types=1);

namespace App\Mailer;

use App\Model\Contact\ContactMeDTO;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class ContactMeMailer
{
    private string $personalEmail;

    private MailerInterface $mailer;

    public function __construct(string $personalEmail, MailerInterface $mailer)
    {
        $this->personalEmail = $personalEmail;
        $this->mailer = $mailer;
    }

    public function sendContactEmail(ContactMeDTO $contactDTO): void
    {
        $email = (new Email())
            ->to($this->personalEmail)
            ->from(new Address($contactDTO->getEmail(), $contactDTO->getName()))
            ->subject($contactDTO->getSubject())
            ->text($contactDTO->getMessage())
        ;

        $this->mailer->send($email);
    }
}
