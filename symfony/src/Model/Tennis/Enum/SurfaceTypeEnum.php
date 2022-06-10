<?php

declare(strict_types=1);

namespace Model\Tennis\Enum;

class SurfaceTypeEnum
{
    final public const GRASS_TYPE = 'GRASS';
    final public const CLAY_TYPE = 'CLAY';
    final public const HARD_TYPE = 'HARD';

    final public const GRASS = 'grass';
    final public const SYNTHETIC_GRASS = 'synthetic_grass';
    final public const RED_CLAY = 'red_clay';
    final public const GREEN_CLAY = 'green_clay';
    final public const RED_CLAY_INDOOR = 'red_clay_indoor';
    final public const HARD_COURT = 'hard_court';
    final public const HARDCOURT_OUTDOOR = 'hardcourt_outdoor';
    final public const HARDCOURT_INDOOR = 'hardcourt_indoor';
    final public const CARPET_INDOOR = 'carpet_indoor';
    final public const SYNTHETIC_INDOOR = 'synthetic_indoor';
    final public const SYNTHETIC_OUTDOOR = 'synthetic_outdoor';
    final public const UNKNOWN = 'unknown';

    public static function resolveType(string $surface): string
    {
        return match ($surface) {
            self::RED_CLAY, self::GREEN_CLAY, self::RED_CLAY_INDOOR => self::CLAY_TYPE,
            self::GRASS, self::SYNTHETIC_GRASS => self::GRASS_TYPE,
            default => self::HARD_TYPE,
        };
    }
}
