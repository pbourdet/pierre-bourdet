<?php

namespace Tests\Unit\Domain\Tennis\Normalizer;

use Domain\Tennis\Normalizer\PlayerProfilePeriodsSumNormalizer;
use Model\Tennis\Enum\SurfaceTypeEnum;
use Model\Tennis\PlayerProfile\Period;
use Model\Tennis\PlayerProfile\PlayerProfile;
use Model\Tennis\PlayerProfile\Statistics;
use Model\Tennis\PlayerProfile\Surface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PlayerProfilePeriodsSumNormalizerTest extends TestCase
{
    private MockObject|ObjectNormalizer $normalizer;

    private PlayerProfilePeriodsSumNormalizer $testedObject;

    protected function setUp(): void
    {
        $this->normalizer = $this
            ->getMockBuilder(ObjectNormalizer::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new PlayerProfilePeriodsSumNormalizer(
            $this->normalizer
        );
    }

    public function testNormalize(): void
    {
        $expected = [
            'year' => 0,
            'surfaces' => [
                [
                    'type' => SurfaceTypeEnum::HARDCOURT_OUTDOOR,
                    'statistics' => [
                        'matchesPlayed' => 10,
                        'competitionPlayed' => 3,
                        'competitionWon' => 0,
                        'matchesWon' => 5,
                    ],
                ],
                [
                    'type' => SurfaceTypeEnum::RED_CLAY_INDOOR,
                    'statistics' => [
                        'matchesPlayed' => 5,
                        'competitionPlayed' => 2,
                        'competitionWon' => 1,
                        'matchesWon' => 4,
                    ],
                ],
                [
                    'type' => SurfaceTypeEnum::GRASS,
                    'statistics' => [
                        'matchesPlayed' => 2,
                        'competitionPlayed' => 1,
                        'competitionWon' => 0,
                        'matchesWon' => 1,
                    ],
                ],
            ],
            'statistics' => [
                'competitionPlayed' => 0,
                'competitionWon' => 0,
                'matchesPlayed' => 0,
                'matchesWon' => 0,
            ],
        ];

        $playerProfile = $this->getInitialProfile();
        $playerProfile->periods[] = $this->getPeriodsSum();

        $this->normalizer
            ->expects($this->once())
            ->method('normalize')
            ->with($playerProfile, 'json', ['groups' => PlayerProfile::READ])
            ->willReturn($expected)
        ;

        $actual = $this->testedObject->normalize($this->getInitialProfile(), 'json', ['groups' => PlayerProfile::READ]);

        $this->assertEquals($expected, $actual);
    }

    private function getInitialProfile(): PlayerProfile
    {
        $playerProfile = new PlayerProfile();
        $period1 = new Period();

        $hardSurface = new Surface();
        $hardSurface->type = SurfaceTypeEnum::HARDCOURT_OUTDOOR;
        $hardSurfaceStatistics = new Statistics();
        $hardSurfaceStatistics->matchesPlayed = 5;
        $hardSurfaceStatistics->competitionsPlayed = 2;
        $hardSurfaceStatistics->competitionsWon = 0;
        $hardSurfaceStatistics->matchesWon = 4;
        $hardSurface->statistics = $hardSurfaceStatistics;

        $claySurface = new Surface();
        $claySurface->type = SurfaceTypeEnum::RED_CLAY_INDOOR;
        $claySurfaceStatistics = new Statistics();
        $claySurfaceStatistics->matchesPlayed = 5;
        $claySurfaceStatistics->competitionsPlayed = 2;
        $claySurfaceStatistics->competitionsWon = 1;
        $claySurfaceStatistics->matchesWon = 4;
        $claySurface->statistics = $claySurfaceStatistics;

        $period1->surfaces = [$hardSurface, $claySurface];

        $period2 = new Period();
        $hardSurface = new Surface();
        $hardSurface->type = SurfaceTypeEnum::HARDCOURT_OUTDOOR;
        $hardSurfaceStatistics = new Statistics();
        $hardSurfaceStatistics->matchesPlayed = 5;
        $hardSurfaceStatistics->competitionsPlayed = 1;
        $hardSurfaceStatistics->competitionsWon = 0;
        $hardSurfaceStatistics->matchesWon = 1;
        $hardSurface->statistics = $hardSurfaceStatistics;

        $grassSurface = new Surface();
        $grassSurface->type = SurfaceTypeEnum::GRASS;
        $grassSurfaceStatistics = new Statistics();
        $grassSurfaceStatistics->matchesPlayed = 2;
        $grassSurfaceStatistics->competitionsPlayed = 1;
        $grassSurfaceStatistics->competitionsWon = 0;
        $grassSurfaceStatistics->matchesWon = 1;
        $grassSurface->statistics = $grassSurfaceStatistics;

        $period2->surfaces = [$hardSurface, $grassSurface];

        $playerProfile->periods = [$period1, $period2];

        return $playerProfile;
    }

    private function getPeriodsSum(): Period
    {
        $period = new Period();

        $hardSurface = new Surface();
        $hardSurface->type = SurfaceTypeEnum::HARDCOURT_OUTDOOR;
        $hardSurfaceStatistics = new Statistics();
        $hardSurfaceStatistics->matchesPlayed = 10;
        $hardSurfaceStatistics->competitionsPlayed = 3;
        $hardSurfaceStatistics->competitionsWon = 0;
        $hardSurfaceStatistics->matchesWon = 5;
        $hardSurface->statistics = $hardSurfaceStatistics;

        $claySurface = new Surface();
        $claySurface->type = SurfaceTypeEnum::RED_CLAY_INDOOR;
        $claySurfaceStatistics = new Statistics();
        $claySurfaceStatistics->matchesPlayed = 5;
        $claySurfaceStatistics->competitionsPlayed = 2;
        $claySurfaceStatistics->competitionsWon = 1;
        $claySurfaceStatistics->matchesWon = 4;
        $claySurface->statistics = $claySurfaceStatistics;

        $grassSurface = new Surface();
        $grassSurface->type = SurfaceTypeEnum::GRASS;
        $grassSurfaceStatistics = new Statistics();
        $grassSurfaceStatistics->matchesPlayed = 2;
        $grassSurfaceStatistics->competitionsPlayed = 1;
        $grassSurfaceStatistics->competitionsWon = 0;
        $grassSurfaceStatistics->matchesWon = 1;
        $grassSurface->statistics = $grassSurfaceStatistics;

        $period->statistics->addStatistics($hardSurfaceStatistics);
        $period->statistics->addStatistics($claySurfaceStatistics);
        $period->statistics->addStatistics($grassSurfaceStatistics);

        $period->surfaces = [$hardSurface, $claySurface, $grassSurface];

        return $period;
    }
}
