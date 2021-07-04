<?php

declare(strict_types=1);

namespace App\Controller\Security;

use App\Security\AuthenticationSuccessListener;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogoutController extends AbstractController
{
    #[Route('/security/logout', name: 'api_logout', methods: [Request::METHOD_POST])]
    public function __invoke(): JsonResponse
    {
        $response = $this->json(null, Response::HTTP_NO_CONTENT);

        $response->headers->clearCookie(
            name: 'BEARER',
            secure: true,
            sameSite: 'none'
        );

        $response->headers->clearCookie(
            name: AuthenticationSuccessListener::REFRESH_TOKEN_COOKIE_NAME,
            secure: true,
            sameSite: 'none'
        );

        return $response;
    }
}
