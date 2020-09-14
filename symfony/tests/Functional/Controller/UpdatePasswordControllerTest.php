<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use App\DataFixtures\UserFixtures;
use App\Tests\Functional\AbstractEndPoint;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdatePasswordControllerTest extends AbstractEndPoint
{
    private const UPDATE_PASSWORD_URI = '/account/update-password';

    public function testUpdatePassword(): void
    {
        $payload = sprintf(
            '{"previousPassword": "%s","newPassword": "%s","confirmedPassword": "%s"}',
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD,
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::UPDATE_PASSWORD_URI,
            $payload,
            [],
            true,
            ''
        );

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    public function testUpdatePasswordNotLoggedIn(): void
    {
        $payload = sprintf(
            '{"previousPassword": "%s","newPassword": "%s","confirmedPassword": "%s"}',
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD,
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::UPDATE_PASSWORD_URI,
            $payload,
            [],
            false,
            ''
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }
}
