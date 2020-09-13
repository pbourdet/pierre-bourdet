<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Model\Account\UpdatePasswordDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UpdatePasswordController extends AbstractController
{
    public function __invoke(
        UpdatePasswordDTO $data,
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $encoder
    ): JsonResponse {
        if (count($errors = $validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        /** @var User $user */
        $user = $this->getUser();
        $user->setPassword($encoder->encodePassword($user, $data->getNewPassword()));
        $user->hasBeenUpdated();

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $this->json('PASSWORD_UPDATED', Response::HTTP_OK);
    }
}
