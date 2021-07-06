<?php

namespace Tests\Unit\Domain\Tennis\Repository;

use Domain\Tennis\Repository\RankingsRepository;
use Domain\Tennis\SportRadarClient;
use Model\Tennis\Exception\RankingNotFoundException;
use Model\Tennis\ExternalModel\Rankings\Ranking;
use Model\Tennis\ExternalModel\Rankings\RankingsBaseClass;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class RankingsRepositoryTest extends TestCase
{
    private MockObject | SportRadarClient $client;

    private RankingsRepository $testedObject;

    protected function setUp(): void
    {
        $this->client = $this
            ->getMockBuilder(SportRadarClient::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new RankingsRepository(
            $this->client
        );
    }

    public function testGetSinglesRankingsByName(): void
    {
        $rankingsBaseClass = new RankingsBaseClass();
        $ranking = new Ranking();
        $ranking->name = 'name';

        $rankingsBaseClass->rankings = [$ranking];

        $this->client->expects($this->once())->method('getSinglesRankings')->willReturn($rankingsBaseClass);

        $actual = $this->testedObject->getSinglesRankingsByName('name');

        $this->assertEquals($ranking, $actual);
    }

    public function testGetSinglesRankingsWithException(): void
    {
        $this->expectException(RankingNotFoundException::class);

        $rankingsBaseClass = new RankingsBaseClass();
        $ranking = new Ranking();
        $ranking->name = 'name';

        $rankingsBaseClass->rankings = [$ranking];

        $this->client->expects($this->once())->method('getSinglesRankings')->willReturn($rankingsBaseClass);

        $this->testedObject->getSinglesRankingsByName('wrong name');
    }
}
