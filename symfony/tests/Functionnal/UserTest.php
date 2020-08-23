<?php

declare(strict_types=1);

namespace App\Tests\Functionnal;

use Faker\Factory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserTest extends AbstractEndPoint
{
    private const USERS_URI = '/users';

    public function testGetUsers(): void
    {
        $response = $this->getResponseFromRequest(Request::METHOD_GET, self::USERS_URI);

        $content = $response->getContent();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty(json_decode($content));
    }

    public function testPostUser(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::USERS_URI,
            $this->getPayload()
            );

        $content = $response->getContent();

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty(json_decode($content));
    }

    public function testDeleteUser(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_DELETE,
            self::USERS_URI.'/1'
        );

        $content = $response->getContent();

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
        $this->assertEmpty(json_decode($content));
    }

    private function getPayload(): string
    {
        $email = (Factory::create())->email;

        return sprintf('{"email":"%s","password":"password"}', $email);
    }
}
