<?php

declare(strict_types=1);

namespace App\Tests\Functional\Entity;

use App\Tests\Functional\AbstractEndPoint;
use Faker\Factory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TodoTest extends AbstractEndPoint
{
    private const TODOS_URI = '/todos';

    public function testGetTodos(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::TODOS_URI,
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertCount(5, $contentDecoded);
    }

    public function testPostTodo(): int
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::TODOS_URI,
            $this->getPayload()
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('date', $contentDecoded);

        return $contentDecoded['id'];
    }

    /**
     * @depends testPostTodo
     */
    public function testPutTodo(int $id): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_PUT,
            self::TODOS_URI.'/'.$id,
            $this->getPayload()
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('date', $contentDecoded);
    }

    /**
     * @depends testPostTodo
     */
    public function testDeleteTodo(int $id): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_DELETE,
            self::TODOS_URI.'/'.$id
        );

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
    }

    public function testGetTodosNotLoggedIn(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::TODOS_URI,
            '',
            [],
            false
            );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testPostTodoNotLoggedIn(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::TODOS_URI,
            $this->getPayload(),
            [],
            false
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testPutTodoNotLoggedIn(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_PUT,
            self::TODOS_URI.'/1',
            $this->getPayload(),
            [],
            false
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testDeleteTodoNotLoggedIn(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_DELETE,
            self::TODOS_URI.'/1',
            $this->getPayload(),
            [],
            false
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    private function getPayload(): string
    {
        $faker = Factory::create();
        $name = $faker->word;
        $description = $faker->sentence;
        $date = '2120-09-13T23:52:32.989Z';

        return sprintf('{"name":"%s","description":"%s","date":"%s"}', $name, $description, $date);
    }
}
