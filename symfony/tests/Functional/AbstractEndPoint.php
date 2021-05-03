<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\DataFixtures\UserFixtures;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractEndPoint extends WebTestCase
{
    protected const SERVER_INFORMATIONS = [
        'HTTP_ACCEPT' => 'application/json',
        'ACCEPT' => 'application/json',
        'CONTENT_TYPE' => 'application/json',
    ];
    protected const TOKEN_NOT_FOUND = 'JWT Token not found';
    protected const NOT_YOUR_RESOURCE = 'This is not your resource';
    protected const LOGIN_PAYLOAD = '{"username":"%s","password":"%s"}';

    public function getResponseFromRequest(
        string $method,
        string $uri,
        string $payload = '',
        array $parameters = [],
        bool $withAuthentication = true,
        string $json = '.json'
    ): Response {
        $client = $this->createApiClient($withAuthentication);

        $client->request(
            $method,
            $uri.$json,
            $parameters,
            [],
            self::SERVER_INFORMATIONS,
            $payload
        );

        return $client->getResponse();
    }

    protected function createApiClient(bool $withAuthentification): KernelBrowser
    {
        $client = self::createClient();

        if (!$withAuthentification) {
            return $client;
        }

        $client->request(
            Request::METHOD_POST,
            '/login_check',
            [],
            [],
            self::SERVER_INFORMATIONS,
            sprintf(self::LOGIN_PAYLOAD, UserFixtures::DEFAULT_EMAIL, UserFixtures::DEFAULT_PASSWORD)
        );

        return $client;
    }
}
