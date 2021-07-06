<?php

declare(strict_types=1);

namespace Model\Tennis\ExternalModel\PlayerProfile;

use Model\Tennis\ExternalModel\Rankings\CompetitorRanking;

class PlayerProfile
{
    public Competitor $competitor;

    public PlayerInformation $info;

    /** @var CompetitorRanking[] */
    public array $competitorRankings = [];

    /** @var Period[] */
    public array $periods = [];

    /** @var Competition[] */
    public array $competitionsPlayed = [];

    public function __construct()
    {
        $this->competitor = new Competitor();
        $this->info = new PlayerInformation();
    }
}
