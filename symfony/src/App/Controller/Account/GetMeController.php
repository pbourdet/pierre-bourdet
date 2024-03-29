<?php

declare(strict_types=1);

namespace App\Controller\Account;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetMeController extends AbstractController
{
    final public const PATH = '/account/me';

    public function __invoke(): User
    {
        /** @var User $user */
        $user = $this->getUser();

        return $user;
    }
}
