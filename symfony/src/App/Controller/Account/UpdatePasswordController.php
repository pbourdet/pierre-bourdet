<?php

declare(strict_types=1);

namespace App\Controller\Account;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Model\Account\UpdatePasswordDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UpdatePasswordController extends AbstractController
{
    final public const PATH = '/account/update-password';

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly UserPasswordHasherInterface $hasher,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(UpdatePasswordDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        /** @var User $user */
        $user = $this->getUser();

        $user->setPassword($this->hasher->hashPassword($user, $data->getNewPassword()));
        $user->hasBeenUpdated();

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['message' => 'PASSWORD_UPDATED'], Response::HTTP_OK);
    }
}
