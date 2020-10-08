<?php

declare(strict_types=1);

namespace App\DataTransformer\User;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\User;
use App\Model\User\CreateUserDTO;

final class CreateUserDataTransformer implements DataTransformerInterface
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    /**
     * @param CreateUserDTO $object
     *
     * @return User
     *
     * @throws ValidationException
     */
    public function transform($object, string $to, array $context = [])
    {
        $this->validator->validate($object);
        $user = new User();

        $user
            ->setPassword($object->getPassword())
            ->setNickname($object->getNickname())
            ->setEmail($object->getEmail());

        return $user;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return isset($context['input']['class']) && CreateUserDTO::class === $context['input']['class'];
    }
}
