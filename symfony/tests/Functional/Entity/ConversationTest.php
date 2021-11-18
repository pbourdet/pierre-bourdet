<?php

declare(strict_types=1);

namespace Tests\Functional\Entity;

use App\DataFixtures\UserFixtures;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class ConversationTest extends AbstractEndPoint
{
    private const CONVERSATIONS_URI = '/conversations';

    public function testGetConversationCollection(): string
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_GET,
            uri: self::CONVERSATIONS_URI,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertCount(9, $contentDecoded);

        return $contentDecoded[0]['id'];
    }

    /** @depends testGetConversationCollection */
    public function testGetConversation(string $id): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_GET,
            uri: sprintf('%s/%s', self::CONVERSATIONS_URI, $id),
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('messages', $contentDecoded);
    }

    public function testPostConversation(): void
    {
        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: '/conversations',
            payload: sprintf('{"userId": "%s"}', UserFixtures::USER_WITH_NO_CONVERSATION),
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('id', $contentDecoded);
        $this->assertArrayHasKey('messages', $contentDecoded);
    }
}
