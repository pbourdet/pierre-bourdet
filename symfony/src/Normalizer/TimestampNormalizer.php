<?php

declare(strict_types=1);

namespace App\Normalizer;

use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class TimestampNormalizer extends DateTimeNormalizer
{
    public function normalize($object, string $format = null, array $context = []): int
    {
        return $object->getTimestamp() * 1000;
    }

    public function supportsNormalization($data, string $format = null): bool
    {
        return parent::supportsNormalization($data, $format);
    }

    public function denormalize($data, $type, string $format = null, array $context = [])
    {
        if (is_int($data)) {
            return (new \DateTime())->setTimestamp($data);
        }

        return parent::denormalize($data, $type, $format, $context);
    }

    public function supportsDenormalization($data, $type, string $format = null): bool
    {
        return parent::supportsDenormalization($data, $type, $format);
    }
}
