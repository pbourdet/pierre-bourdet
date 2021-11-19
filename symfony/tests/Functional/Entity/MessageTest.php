<?php

declare(strict_types=1);

namespace Tests\Functional\Entity;

use App\DataFixtures\ConversationFixtures;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class MessageTest extends AbstractEndPoint
{
    private const MESSAGES_URI = '/messages';

    public function testPostMessages(): void
    {
        $payload = sprintf(
            '{"content":"hello :D", "conversationId":"%s"}',
            ConversationFixtures::CONVERSATION_UUID
        );

        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: self::MESSAGES_URI,
            payload: $payload,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('id', $contentDecoded);
    }
}
