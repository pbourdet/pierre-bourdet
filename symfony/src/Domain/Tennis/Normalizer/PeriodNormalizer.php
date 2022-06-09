<?php

declare(strict_types=1);

namespace Domain\Tennis\Normalizer;

use Model\Tennis\Enum\SurfaceTypeEnum;
use Model\Tennis\PlayerProfile\Period;
use Model\Tennis\PlayerProfile\Surface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PeriodNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

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

            $aggregatedSurfaces[$surfaceType]->statistics->addStatistics($surface->statistics);
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
}
