<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Model\Security\SendResetPasswordEmailDTO;
use App\Repository\UserRepository;
use App\Security\ResetPasswordMailer;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SendResetPasswordEmailController extends AbstractController
{
    private ValidatorInterface $validator;

    private UserRepository $userRepository;

    private EntityManagerInterface $em;

    private ResetPasswordMailer $mailer;

    private LoggerInterface $logger;

    public function __construct(
        ValidatorInterface $validator,
        UserRepository $userRepository,
        EntityManagerInterface $em,
        ResetPasswordMailer $mailer,
        LoggerInterface $logger
    ) {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->mailer = $mailer;
        $this->logger = $logger;
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

        $this->em->persist($user);
        $this->em->flush();

        try {
            $this->mailer->send($user, $token);
        } catch (\Exception $exception) {
            $this->logger->error('Could not send reset password email', [
                'message' => $exception->getMessage(),
                'data' => $data,
            ]);

            return $this->json(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['message' => 'EMAIL_SENT']);
    }
}
