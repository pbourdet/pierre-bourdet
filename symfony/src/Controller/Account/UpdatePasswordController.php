<?php

declare(strict_types=1);

namespace App\Controller\Account;

use App\Entity\User;
use App\Model\Account\UpdatePasswordDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UpdatePasswordController extends AbstractController
{
    private ValidatorInterface $validator;

    private UserPasswordEncoderInterface $encoder;

    public function __construct(ValidatorInterface $validator, UserPasswordEncoderInterface $encoder)
    {
        $this->validator = $validator;
        $this->encoder = $encoder;
    }

    public function __invoke(UpdatePasswordDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        /** @var User $user */
        $user = $this->getUser();

        $user->setPassword($this->encoder->encodePassword($user, $data->getNewPassword()));
        $user->hasBeenUpdated();

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'PASSWORD_UPDATED'], Response::HTTP_OK);
    }
}
