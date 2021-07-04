<?php

declare(strict_types=1);

namespace Tests\Functional\Controller\Contact;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\Functional\AbstractEndPoint;

class ContactMeControllerTest extends AbstractEndPoint
{
    private const CONTACT_ME_URI = '/public/contact-me';

    public function testContactMe(): void
    {
        $payload = sprintf(
            '{"email":"%s","name":"%s","subject":"%s","message":"%s"}',
            'mail@test.fr',
            'name',
            'subject',
            'message'
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::CONTACT_ME_URI,
            $payload,
            [],
            false,
            ''
        );

        $this->assertEquals(Response::HTTP_ACCEPTED, $response->getStatusCode());
    }

    public function testContactMeWithBadEmail(): void
    {
        $payload = sprintf(
            '{"email":"%s","name":"%s","subject":"%s","message":"%s"}',
            'mail@',
            'name',
            'subject',
            'message'
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::CONTACT_ME_URI,
            $payload,
            [],
            false,
            ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertJson($content);
        $this->assertArrayHasKey('detail', $contentDecoded);
        $this->assertArrayHasKey('violations', $contentDecoded);
        $this->assertEquals('email', $contentDecoded['violations'][0]['propertyPath']);
    }
}
