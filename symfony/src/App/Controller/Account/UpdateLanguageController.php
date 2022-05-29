<?php

declare(strict_types=1);

namespace App\Controller\Account;

use App\Entity\User;
use App\Repository\UserRepository;
use Model\Account\Enum\LanguageEnum;
use Model\Account\UpdateLanguageDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UpdateLanguageController extends AbstractController
{
    public const PATH = '/account/update-language';

    public function __construct(
        private ValidatorInterface $validator,
        private UserRepository $userRepository
    ) {
    }

    public function __invoke(UpdateLanguageDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        /** @var User $user */
        $user = $this->getUser();

        if ($user->getLanguage() === $language = LanguageEnum::resolveLanguage($data->language)) {
            return $this->json(null);
        }

        $user->setLanguage($language);
        $this->userRepository->save($user);

        return $this->json(['message' => 'Language updated']);
    }
}
