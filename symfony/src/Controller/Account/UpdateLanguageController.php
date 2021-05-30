<?php

declare(strict_types=1);

namespace App\Controller\Account;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\User;
use App\Model\Account\UpdateLanguageDTO;
use App\Model\Enum\LanguageEnum;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class UpdateLanguageController extends AbstractController
{
    private ValidatorInterface $validator;

    private UserRepository $userRepository;

    public function __construct(ValidatorInterface $validator, UserRepository $userRepository)
    {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
    }

    public function __invoke(UpdateLanguageDTO $data): JsonResponse
    {
        $this->validator->validate($data);

        /** @var User $user */
        $user = $this->getUser();

        if ($user->getLanguage() === $language = LanguageEnum::resolveLanguage($data->language)) {
            return $this->json(null);
        }

        $user->setLanguage($language);
        $this->userRepository->save($user);

        return $this->json(null);
    }
}