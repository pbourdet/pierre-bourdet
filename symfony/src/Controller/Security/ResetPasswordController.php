<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Model\Security\ResetPasswordDTO;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ResetPasswordController extends AbstractController
{
    private ValidatorInterface $validator;

    private UserPasswordEncoderInterface $encoder;

    private UserRepository $userRepository;

    private EntityManagerInterface $em;

    public function __construct(
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $encoder,
        UserRepository $userRepository,
        EntityManagerInterface $em
    ) {
        $this->validator = $validator;
        $this->encoder = $encoder;
        $this->userRepository = $userRepository;
        $this->em = $em;
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

        $user->setPassword($this->encoder->encodePassword($user, $data->password));
        $user->eraseResetPasswordData();
        $user->hasBeenUpdated();

        $this->em->persist($user);
        $this->em->flush();

        return $this->json(['message' => 'PASSWORD_RESET_SUCCESSFUL']);
    }
}
