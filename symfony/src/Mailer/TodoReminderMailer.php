<?php

declare(strict_types=1);

namespace App\Mailer;

use App\Entity\Todo;
use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class TodoReminderMailer
{
    private string $contactEmail;

    private string $contactName;

    private MailerInterface $mailer;

    public function __construct(string $contactEmail, string $contactName, MailerInterface $mailer)
    {
        $this->contactEmail = $contactEmail;
        $this->contactName = $contactName;
        $this->mailer = $mailer;
    }

    public function send(Todo $todo): void
    {
        /** @var User $user */
        $user = $todo->getUser();

        $templateMail = (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail, $this->contactName))
            ->subject(sprintf('Reminder for your todo %s', $todo->getName()))
            ->htmlTemplate('email/todo-reminder.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'todo' => $todo,
            ]);

        $this->mailer->send($templateMail);
    }
}
