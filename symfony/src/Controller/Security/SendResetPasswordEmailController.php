<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Mailer\EmailFactory;
use App\Message\EmailMessage;
use App\Model\Security\SendResetPasswordEmailDTO;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class SendResetPasswordEmailController extends AbstractController
{
    private ValidatorInterface $validator;

    private UserRepository $userRepository;

    private EntityManagerInterface $em;

    private EmailFactory $emailFactory;

    private MessageBusInterface $bus;

    private TranslatorInterface $translator;

    public function __construct(
        ValidatorInterface $validator,
        UserRepository $userRepository,
        EntityManagerInterface $em,
        MessageBusInterface $bus,
        EmailFactory $emailFactory,
        TranslatorInterface $translator
    ) {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->bus = $bus;
        $this->emailFactory = $emailFactory;
        $this->translator = $translator;
    }

    public function __invoke(SendResetPasswordEmailDTO $data, Request $request): JsonResponse
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

        $this->em->persist($user);
        $this->em->flush();

        $email = $this->emailFactory->createForResetPassword(
            $user,
            $token,
            $this->translator->trans('subject', [], 'reset-email')
        );

        $this->bus->dispatch(new EmailMessage($email, $request->getLocale()));

        return $this->json(['message' => 'EMAIL_SENT']);
    }
}
