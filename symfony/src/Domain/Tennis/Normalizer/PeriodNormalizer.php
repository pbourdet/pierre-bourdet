<?php

declare(strict_types=1);

namespace Domain\Tennis\Normalizer;

use Model\Tennis\Enum\SurfaceTypeEnum;
use Model\Tennis\PlayerProfile\Period;
use Model\Tennis\PlayerProfile\Surface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PeriodNormalizer implements ContextAwareNormalizerInterface
{
    public function __construct(
        private ObjectNormalizer $normalizer
    ) {
    }

    /** @param Period $period */
    public function normalize($period, string $format = null, array $context = []): array
    {
        $aggregatedSurfaces = [];

        foreach ($period->surfaces as $surface) {
            if ($this->isNewSurface($aggregatedSurfaces, $surfaceType = SurfaceTypeEnum::resolveType($surface->type))) {
                $surface->type = $surfaceType;
                $aggregatedSurfaces[$surfaceType] = $surface;

                continue;
            }

            $this->addSurfaceStatistics($aggregatedSurfaces, $surface, $surfaceType);
        }

        $period->surfaces = array_values($aggregatedSurfaces);

        /** @var array $data */
        $data = $this->normalizer->normalize($period, $format, $context);

        return $data;
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return $data instanceof Period;
    }

    /** @param array<string, Surface> $aggregatedSurfaces */
    private function isNewSurface(array $aggregatedSurfaces, string $surfaceType): bool
    {
        foreach ($aggregatedSurfaces as $surface) {
            if ($surfaceType === $surface->type) {
                return false;
            }
        }

        return true;
    }

    /** @param array<string, Surface> $aggregatedSurfaces */
    private function addSurfaceStatistics(array $aggregatedSurfaces, Surface $surface, string $surfaceType): void
    {
        $aggregatedSurfaces[$surfaceType]->statistics->competitionsPlayed += $surface->statistics->competitionsPlayed;
        $aggregatedSurfaces[$surfaceType]->statistics->competitionsWon += $surface->statistics->competitionsWon;
        $aggregatedSurfaces[$surfaceType]->statistics->matchesPlayed += $surface->statistics->matchesPlayed;
        $aggregatedSurfaces[$surfaceType]->statistics->matchesWon += $surface->statistics->matchesWon;
    }
}