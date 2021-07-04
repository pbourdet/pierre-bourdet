<?php

declare(strict_types=1);

namespace Tests\Functional\Entity;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class SnakeGameTest extends AbstractEndPoint
{
    public function testGetTopGames(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_GET,
            uri: '/games/snake/top',
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertCount(5, $contentDecoded);
    }

    public function testGetUserGamesUnauthenticated(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_GET,
            uri: '/games/snake/user',
            withAuthentication: false,
            json: ''
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testGetUserGamesAuthenticated(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_GET,
            uri: '/games/snake/user',
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertCount(5, $contentDecoded);
    }

    public function testCreateGameUnauthenticated(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: '/games/snake',
            withAuthentication: false,
            json: ''
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testCreateGame(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: '/games/snake',
            payload: '{"score":12}',
            json: ''
        );

        $content = $response->getContent();

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
    }
}
