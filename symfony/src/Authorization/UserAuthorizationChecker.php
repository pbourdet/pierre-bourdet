<?php

declare(strict_types=1);

namespace App\Authorization;

use App\Authorization\Exception\AuthenticationException;
use App\Authorization\Exception\ResourceAccessException;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class UserAuthorizationChecker
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function check(User $resourceUser): void
    {
        /** @var User|null $loggedInUser */
        $loggedInUser = $this->security->getUser();

        if (null === $loggedInUser) {
            throw new AuthenticationException(Response::HTTP_UNAUTHORIZED, AuthenticationException::AUTHENTICATION_EXCEPTION);
        }

        if ($loggedInUser->getId() !== $resourceUser->getId()) {
            throw new ResourceAccessException(Response::HTTP_UNAUTHORIZED, ResourceAccessException::RESOURCE_ACCESS_EXCEPTION);
        }
    }
}
