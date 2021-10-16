<?php

declare(strict_types=1);

namespace Infrastructure\Mailer;

use App\Entity\Todo;
use App\Entity\User;
use Model\Contact\ContactMeDTO;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

class EmailFactory
{
    public function __construct(
        private string $frontendDomain,
        private string $contactEmail,
        private string $contactName,
        private string $personalEmail
    ) {
    }

    public function createForContactMe(ContactMeDTO $dto): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->to(new Address($this->personalEmail))
            ->from(new Address($this->contactEmail, $dto->getName()))
            ->subject($dto->getSubject())
            ->htmlTemplate('email/contact.html.twig')
            ->context([
                'from' => $dto->getEmail(),
                'message' => $dto->getMessage(),
            ])
        ;
    }

    public function createForResetPassword(User $user, string $token, string $subject): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail, $this->contactName))
            ->subject($subject)
            ->htmlTemplate('email/reset-password.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'link' => sprintf('%s/reset-password/%s', $this->frontendDomain, $token),
            ])
        ;
    }

    public function createForTodoReminder(Todo $todo, string $subject): TemplatedEmail
    {
        $user = $todo->getUser();

        return (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail, $this->contactName))
            ->subject($subject)
            ->htmlTemplate('email/todo-reminder.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'todo' => $todo,
            ])
        ;
    }

    public function createForUserSubscription(User $user, string $subject): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->from(new Address($this->contactEmail, $this->contactName))
            ->subject($subject)
            ->htmlTemplate('email/user-subscription.html.twig')
            ->context([
                'name' => $user->getNickname(),
                'emailAddress' => $user->getEmail(),
            ])
        ;
    }
}
