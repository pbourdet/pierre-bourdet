<?php

namespace  App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApplicationAvailabilityFunctionalTest extends WebTestCase
{
    /**
     * @dataProvider dataUrlProvider
     */
    public function testPageIsSuccessful(string $url): void
    {
        $client = self::createClient();
        $client->request('GET', $url);

        $this->assertResponseIsSuccessful();
    }

    public function dataUrlProvider()
    {
        yield ['/api'];
    }
}
