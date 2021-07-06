<?php

declare(strict_types=1);

namespace Model\Tennis\ExternalModel\PlayerProfile;

class Surface
{
    public string $type;

    public Statistics $statistics;

    public function __construct()
    {
        $this->statistics = new Statistics();
    }
}
