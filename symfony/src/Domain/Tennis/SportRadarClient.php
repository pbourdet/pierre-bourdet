<?php

declare(strict_types=1);

namespace Domain\Tennis;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class SportRadarClient
{
    public function __construct(
        private HttpClientInterface $client,
        private SerializerInterface $serializer
    ) {
    }

    public function getSinglesRankings(): array
    {
        $response = $this->client->request(
            Request::METHOD_GET,
            '/tennis/trial/v3/fr/rankings.json',
        );

        return $response->toArray(false);
    }
}
