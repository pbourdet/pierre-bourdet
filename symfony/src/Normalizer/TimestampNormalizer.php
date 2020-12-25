<?php

declare(strict_types=1);

namespace App\Normalizer;

use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class TimestampNormalizer implements NormalizerInterface, DenormalizerInterface
{
    private const SUPPORTED_TYPE = [
        \DateTimeInterface::class,
        \DateTimeImmutable::class,
        \DateTime::class,
    ];

    public function normalize($object, string $format = null, array $context = []): int
    {
        return $object->getTimestamp() * 1000;
    }

    public function supportsNormalization($data, string $format = null): bool
    {
        return $data instanceof \DateTimeInterface;
    }

    public function denormalize($data, $type, string $format = null, array $context = []): \DateTime
    {
        return (new \DateTime())->setTimestamp($data / 1000);
    }

    public function supportsDenormalization($data, string $type, string $format = null): bool
    {
        return in_array($type, self::SUPPORTED_TYPE) && is_int($data);
    }
}
