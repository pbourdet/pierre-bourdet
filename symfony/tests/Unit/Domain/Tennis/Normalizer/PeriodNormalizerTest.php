<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Tennis\Normalizer;

use Domain\Tennis\Normalizer\PeriodNormalizer;
use Model\Tennis\Enum\SurfaceTypeEnum;
use Model\Tennis\PlayerProfile\Competitor;
use Model\Tennis\PlayerProfile\Period;
use Model\Tennis\PlayerProfile\PlayerProfile;
use Model\Tennis\PlayerProfile\Statistics;
use Model\Tennis\PlayerProfile\Surface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PeriodNormalizerTest extends TestCase
{
    private MockObject|ObjectNormalizer $normalizer;

    private PeriodNormalizer $testedObject;

    protected function setUp(): void
    {
        $this->normalizer = $this->createMock(NormalizerInterface::class);

        $this->testedObject = new PeriodNormalizer();
        $this->testedObject->setNormalizer($this->normalizer);
    }

    /** @dataProvider dataSupportsNormalization */
    public function testSupportsNormalization(object $data, bool $expected): void
    {
        $this->assertSame($expected, $this->testedObject->supportsNormalization($data));
    }

    public function dataSupportsNormalization(): array
    {
        return [
            'case wrong class' => [
                'data' => new Competitor(),
                'expected' => false,
            ],
            'case Period' => [
                'data' => new Period(),
                'expected' => true,
            ],
        ];
    }

    public function testNormalize(): void
    {
        $expected = [
            'year' => 0,
            'surfaces' => [
                [
                    'type' => SurfaceTypeEnum::HARD_TYPE,
                    'statistics' => [
                        'competitionPlayed' => 4,
                        'competitionWon' => 1,
                        'matchesPlayed' => 15,
                        'matchesWon' => 8,
                    ],
                ],
                [
                    'type' => SurfaceTypeEnum::CLAY_TYPE,
                    'statistics' => [
                        'competitionPlayed' => 2,
                        'competitionWon' => 1,
                        'matchesPlayed' => 5,
                        'matchesWon' => 4,
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

        $this->normalizer
            ->expects($this->once())
            ->method('normalize')
            ->with($this->getAggregatedPeriod(), 'json', ['groups' => PlayerProfile::READ])
            ->willReturn($expected)
        ;

        $actual = $this->testedObject->normalize($this->getInitialPeriod(), 'json', ['groups' => PlayerProfile::READ]);

        $this->assertSame($expected, $actual);
    }

    private function getInitialPeriod(): Period
    {
        $period = new Period();

        $hardSurface1 = new Surface();
        $hardSurface1->type = SurfaceTypeEnum::HARDCOURT_OUTDOOR;
        $hardSurface1Statistics = new Statistics();
        $hardSurface1Statistics->matchesPlayed = 10;
        $hardSurface1Statistics->competitionsPlayed = 2;
        $hardSurface1Statistics->competitionsWon = 0;
        $hardSurface1Statistics->matchesWon = 4;
        $hardSurface1->statistics = $hardSurface1Statistics;

        $hardSurface2 = new Surface();
        $hardSurface2->type = SurfaceTypeEnum::HARDCOURT_INDOOR;
        $hardSurface2Statistics = new Statistics();
        $hardSurface2Statistics->matchesPlayed = 5;
        $hardSurface2Statistics->competitionsPlayed = 2;
        $hardSurface2Statistics->competitionsWon = 1;
        $hardSurface2Statistics->matchesWon = 4;
        $hardSurface2->statistics = $hardSurface2Statistics;

        $claySurface = new Surface();
        $claySurface->type = SurfaceTypeEnum::RED_CLAY_INDOOR;
        $claySurfaceStatistics = new Statistics();
        $claySurfaceStatistics->matchesPlayed = 5;
        $claySurfaceStatistics->competitionsPlayed = 2;
        $claySurfaceStatistics->competitionsWon = 1;
        $claySurfaceStatistics->matchesWon = 4;
        $claySurface->statistics = $claySurfaceStatistics;

        $period->surfaces = [$hardSurface1, $hardSurface2, $claySurface];

        return $period;
    }

    private function getAggregatedPeriod(): Period
    {
        $period = new Period();

        $aggregatedHardSurface = new Surface();
        $aggregatedHardSurface->type = SurfaceTypeEnum::HARD_TYPE;
        $aggregatedHardSurfaceStatistics = new Statistics();
        $aggregatedHardSurfaceStatistics->matchesPlayed = 15;
        $aggregatedHardSurfaceStatistics->competitionsPlayed = 4;
        $aggregatedHardSurfaceStatistics->competitionsWon = 1;
        $aggregatedHardSurfaceStatistics->matchesWon = 8;
        $aggregatedHardSurface->statistics = $aggregatedHardSurfaceStatistics;

        $aggregatedClaySurface = new Surface();
        $aggregatedClaySurface->type = SurfaceTypeEnum::CLAY_TYPE;
        $aggregatedClaySurfaceStatistics = new Statistics();
        $aggregatedClaySurfaceStatistics->matchesPlayed = 5;
        $aggregatedClaySurfaceStatistics->competitionsPlayed = 2;
        $aggregatedClaySurfaceStatistics->competitionsWon = 1;
        $aggregatedClaySurfaceStatistics->matchesWon = 4;
        $aggregatedClaySurface->statistics = $aggregatedClaySurfaceStatistics;

        $period->surfaces = [$aggregatedHardSurface, $aggregatedClaySurface];

        return $period;
    }
}
