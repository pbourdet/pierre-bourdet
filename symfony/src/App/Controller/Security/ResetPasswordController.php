<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Repository\UserRepository;
use Model\Security\ResetPasswordDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ResetPasswordController extends AbstractController
{
    final public const PATH = '/security/reset-password';

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly UserPasswordHasherInterface $hasher,
        private readonly UserRepository $userRepository
    ) {
    }

    public function __invoke(ResetPasswordDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy([
            'resetPasswordToken' => $data->token,
        ]);

        if (null === $user || $user->isResetPasswordTokenExpired()) {
            return $this->json(['message' => 'INVALID_TOKEN'], Response::HTTP_UNAUTHORIZED);
        }

        $user->setPassword($this->hasher->hashPassword($user, $data->password));
        $user->eraseResetPasswordData();
        $user->hasBeenUpdated();

        $this->userRepository->save($user);

        return $this->json(['email' => $user->getEmail()]);
    }
}
