<?php

declare(strict_types=1);

namespace Domain\Tennis\Normalizer;

use Model\Tennis\PlayerProfile\Period;
use Model\Tennis\PlayerProfile\PlayerProfile;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PlayerProfilePeriodsSumNormalizer implements ContextAwareNormalizerInterface
{
    public function __construct(
        private ObjectNormalizer $normalizer
    ) {
    }

    /** @param PlayerProfile $playerProfile */
    public function normalize($playerProfile, string $format = null, array $context = []): array
    {
        $sumPeriod = new Period();

        foreach ($playerProfile->periods as $period) {
            foreach ($period->surfaces as $surface) {
                $sumPeriod->addSurface($surface);
            }
        }

        $playerProfile->periods[] = $sumPeriod;

        /** @var array $data */
        $data = $this->normalizer->normalize($playerProfile, $format, $context);

        return $data;
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return $data instanceof PlayerProfile;
    }
}
