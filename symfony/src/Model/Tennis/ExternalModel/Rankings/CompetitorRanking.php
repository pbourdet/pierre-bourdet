<?php

declare(strict_types=1);

namespace Model\Tennis\ExternalModel\Rankings;

class CompetitorRanking
{
    public int $rank = 0;

    public int $movement = 0;

    public int $points = 0;

    public int $competitionsPlayed = 0;

    public Competitor $competitor;

    public function __construct()
    {
        $this->competitor = new Competitor();
    }
}
