<?php

declare(strict_types=1);

namespace App\Authorization;

use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Security;

class UserAuthorizationChecker
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function check(User $user): void
    {
        /** @var User|null $loggedInUser */
        $loggedInUser = $this->security->getUser();

        if (null === $loggedInUser) {
            $errorMessage = 'You are not authenticated';
            throw new UnauthorizedHttpException($errorMessage, $errorMessage);
        }

        if ($loggedInUser->getId() !== $user->getId()) {
            $errorMessage = 'This is not your resource';
            throw new UnauthorizedHttpException($errorMessage, $errorMessage);
        }
    }
}
