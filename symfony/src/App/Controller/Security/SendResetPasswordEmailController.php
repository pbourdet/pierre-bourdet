<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Repository\UserRepository;
use Infrastructure\Mailer\EmailFactory;
use Infrastructure\Mailer\EmailMessage;
use Model\Security\SendResetPasswordEmailDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class SendResetPasswordEmailController extends AbstractController
{
    final public const PATH = '/security/reset-password-email';

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly UserRepository $userRepository,
        private readonly MessageBusInterface $bus,
        private readonly EmailFactory $emailFactory,
        private readonly TranslatorInterface $translator
    ) {
    }

    public function __invoke(SendResetPasswordEmailDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy([
            'email' => $data->email,
        ]);

        if (null === $user) {
            return $this->json(['message' => 'EMAIL_SENT']);
        }

        $token = Uuid::v4()->toRfc4122();

        $user->setResetPasswordToken($token);
        $user->setResetPasswordExpirationDate(new \DateTimeImmutable('+1 hours'));
        $user->hasBeenUpdated();

        $this->userRepository->save($user);

        $locale = $user->getLanguage();
        $email = $this->emailFactory->createForResetPassword(
            $user,
            $token,
            $this->translator->trans('subject', [], 'reset-email', $locale)
        );

        $this->bus->dispatch(new EmailMessage($email, $locale));

        return $this->json(['message' => 'EMAIL_SENT']);
    }
}
