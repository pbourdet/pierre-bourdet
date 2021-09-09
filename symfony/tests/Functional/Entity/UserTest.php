<?php

declare(strict_types=1);

namespace Tests\Functional\Entity;

use App\DataFixtures\UserFixtures;
use Faker\Factory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class UserTest extends AbstractEndPoint
{
    private const USERS_URI = '/users';

    public function testGetUsers(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::USERS_URI,
            '',
            [],
            true
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty($contentDecoded);
    }

    public function testPostUser(): string
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::USERS_URI,
            $this->getPayload(),
            [],
            false
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty($contentDecoded);

        return $contentDecoded['id'];
    }

    public function testGetDefaultUser(): string
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::USERS_URI.'/'.UserFixtures::DEFAULT_UUID,
            '',
            [],
            true
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty($contentDecoded);

        return $contentDecoded['id'];
    }

    /**
     * @depends testGetDefaultUser
     */
    public function testPutDefaultUser(string $id): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_PUT,
            self::USERS_URI.'/'.$id,
            $this->getPayload(),
            [],
            false
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertJson($content);
        $this->assertEquals(Response::HTTP_METHOD_NOT_ALLOWED, $response->getStatusCode());
        $this->assertArrayHasKey('message', $contentDecoded);
    }

    /**
     * @depends testGetDefaultUser
     */
    public function testPatchDefaultUser(string $id): void
    {
        $response = $this->getResponseFromRequest(
                Request::METHOD_PATCH,
                self::USERS_URI.'/'.$id,
                $this->getPayload(),
                [],
                false
            );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertJson($content);
        $this->assertEquals(Response::HTTP_METHOD_NOT_ALLOWED, $response->getStatusCode());
        $this->assertArrayHasKey('message', $contentDecoded);
    }

    /**
     * @depends testGetDefaultUser
     */
    public function testDeleteDefaultUser(string $id): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_DELETE,
            self::USERS_URI.'/'.$id,
            $this->getPayload(),
            [],
            false
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty($contentDecoded);
    }

    /**
     * @depends testPostUser
     */
    public function testDeleteOtherUserWithJWT(string $id): void
    {
        $response = $this->getResponseFromRequest(
                Request::METHOD_DELETE,
                self::USERS_URI.'/'.$id
            );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertNotEmpty($contentDecoded);
        $this->assertEquals(self::NOT_YOUR_RESOURCE, $contentDecoded['message']);
    }

    /**
     * @depends testGetDefaultUser
     */
    public function testDeleteDefaultUserWithJWT(string $id): void
    {
        $response = $this->getResponseFromRequest(
                Request::METHOD_DELETE,
                self::USERS_URI.'/'.$id
            );

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
    }

    private function getPayload(): string
    {
        $faker = Factory::create();
        $email = $faker->email();
        $nickname = $faker->firstName();
        $language = 'en-GB';

        return sprintf(
            '{"email":"%s","password":"123456","nickname":"%s","language":"%s"}',
            $email,
            $nickname,
            $language
        );
    }
}
