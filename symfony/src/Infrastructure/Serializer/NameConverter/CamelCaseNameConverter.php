<?php

declare(strict_types=1);

namespace Infrastructure\Serializer\NameConverter;

use Symfony\Component\Serializer\NameConverter\NameConverterInterface;
use function Symfony\Component\String\u;

class CamelCaseNameConverter implements NameConverterInterface
{
    public function normalize(string $propertyName): string
    {
        return u($propertyName)->camel()->toString();
    }

    public function denormalize(string $propertyName): string
    {
        return u($propertyName)->camel()->toString();
    }
}
