<?php

declare(strict_types=1);

namespace Tests\Functional\Controller\Account;

use Model\Account\Enum\LanguageEnum;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class UpdateLanguageControllerTest extends AbstractEndPoint
{
    private const UPDATE_LANGUAGE_URI = '/account/update-language';

    public function testUpdateLanguage(): void
    {
        $payload = sprintf(
            '{"language": "%s"}',
            LanguageEnum::FR_ISO639,
        );

        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: self::UPDATE_LANGUAGE_URI,
            payload: $payload,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('message', $contentDecoded);
    }

    /** @depends testUpdateLanguage */
    public function testUpdateLanguageWithSameLanguage(): void
    {
        $payload = sprintf(
            '{"language": "%s"}',
            LanguageEnum::FR_ISO639,
        );

        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: self::UPDATE_LANGUAGE_URI,
            payload: $payload,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertNull($contentDecoded);
    }

    public function testUpdateLanguageNotLoggedIn(): void
    {
        $payload = sprintf(
            '{"language": "%s"}',
            LanguageEnum::FR_ISO639,
        );

        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: self::UPDATE_LANGUAGE_URI,
            payload: $payload,
            withAuthentication: false,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('message', $contentDecoded);
    }

    public function testUpdateLanguageWithNotValidLanguage(): void
    {
        $payload = sprintf(
            '{"language": "%s"}',
            LanguageEnum::FR,
        );

        $response = $this->getResponseFromRequest(
            method: Request::METHOD_POST,
            uri: self::UPDATE_LANGUAGE_URI,
            payload: $payload,
            json: ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('detail', $contentDecoded);
        $this->assertArrayHasKey('violations', $contentDecoded);
        $this->assertEquals('language', $contentDecoded['violations'][0]['propertyPath']);
    }
}
