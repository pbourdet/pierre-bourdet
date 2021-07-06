<?php

declare(strict_types=1);

namespace Domain\Tennis;

use Model\Tennis\Exception\SportRadarApiException;
use Model\Tennis\ExternalModel\PlayerProfile\PlayerProfile;
use Model\Tennis\ExternalModel\Rankings\RankingsBaseClass;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class SportRadarClient
{
    public function __construct(
        private HttpClientInterface $client,
        private SerializerInterface $serializer,
        private LoggerInterface $logger
    ) {
    }

    public function getSinglesRankings(): RankingsBaseClass
    {
        return $this->request(
            '/tennis/trial/v3/fr/rankings.json',
            RankingsBaseClass::class
        );
    }

    public function getPlayerProfile(string $playerId): object
    {
        return $this->request(
            sprintf('/tennis/trial/v3/en/competitors/%s/profile.json', $playerId),
            PlayerProfile::class
        );
    }

    private function request(string $url, string $outputClass): mixed
    {
        $response = $this->client->request(
            Request::METHOD_GET,
            $url
        );

        if ($response->getStatusCode() >= 400) {
            $this->logger->error(
                sprintf('Error when calling URL %s with status code %s', $url, $response->getStatusCode()),
                [
                    'message' => $response->getContent(false),
                ]
            );

            throw new SportRadarApiException($response->getStatusCode(), $response->getContent(false), );
        }

        return $this->serializer->deserialize(
            $response->getContent(),
            $outputClass,
            'json'
        );
    }
}
