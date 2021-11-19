<?php

declare(strict_types=1);

namespace Domain\Tennis;

use Model\Account\Enum\LanguageEnum;
use Model\Tennis\Exception\SportRadarApiException;
use Model\Tennis\PlayerProfile\PlayerProfile;
use Model\Tennis\Rankings\RankingsBaseClass;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class SportRadarClient
{
    public function __construct(
        private HttpClientInterface $client,
        private SerializerInterface $serializer,
        private LoggerInterface $logger,
        RequestStack $requestStack,
        private string $locale = ''
    ) {
        $this->locale = $requestStack->getMainRequest()?->getLocale() ?? LanguageEnum::EN;
    }

    public function getSinglesRankings(): RankingsBaseClass
    {
        /** @var RankingsBaseClass $rankings */
        $rankings = $this->request(
            sprintf('/tennis/trial/v3/%s/rankings.json', $this->locale),
            RankingsBaseClass::class
        );

        return $rankings;
    }

    public function getPlayerProfile(string $playerId): PlayerProfile
    {
        /** @var PlayerProfile $playerProfile */
        $playerProfile = $this->request(
            sprintf('/tennis/trial/v3/%s/competitors/%s/profile.json', $this->locale, $playerId),
            PlayerProfile::class
        );

        return $playerProfile;
    }

    private function request(string $url, string $outputClass): object
    {
        $response = $this->client->request(
            Request::METHOD_GET,
            $url
        );

        if ($response->getStatusCode() >= Response::HTTP_BAD_REQUEST) {
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
