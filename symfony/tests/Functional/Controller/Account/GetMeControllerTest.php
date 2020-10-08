<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller\Account;

use App\DataFixtures\UserFixtures;
use App\Tests\Functional\AbstractEndPoint;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetMeControllerTest extends AbstractEndPoint
{
    private const GET_ME_URI = '/account/me';

    public function testGetMe(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::GET_ME_URI,
            '',
            [],
            true,
            ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(UserFixtures::DEFAULT_EMAIL, $contentDecoded['email']);
        $this->assertEquals(UserFixtures::DEFAULT_NICKNAME, $contentDecoded['nickname']);
        $this->assertCount(3, $contentDecoded);
    }

    public function testGetMeNotLoggedIn(): void
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET,
            self::GET_ME_URI,
            '',
            [],
            false,
            ''
        );

        $content = $response->getContent();
        $contentDecoded = json_decode($content, true);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $contentDecoded['code']);
    }
}
