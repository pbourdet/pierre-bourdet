<?php

declare(strict_types=1);

namespace Domain\Tennis\Normalizer;

use Model\Tennis\PlayerProfile\Competitor;
use Symfony\Component\Intl\Countries;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CountryCodeNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    /** @param Competitor $competitor */
    public function normalize($competitor, string $format = null, array $context = []): array
    {
        /** @var array $data */
        $data = $this->normalizer->normalize($competitor, $format, $context);

        try {
            $data['countryCode'] = Countries::getAlpha2Code($competitor->countryCode);
        } catch (\Exception) {
            // Case of TPE country code (Chinese Taipei)
            $data['countryCode'] = 'TW';
        }

        return $data;
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return $data instanceof Competitor;
    }
}
