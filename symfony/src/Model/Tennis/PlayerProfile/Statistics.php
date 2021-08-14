<?php

declare(strict_types=1);

namespace Model\Tennis\PlayerProfile;

use Symfony\Component\Serializer\Annotation as Serializer;

class Statistics
{
    #[Serializer\Groups([PlayerProfile::READ])]
    public int $competitionsPlayed = 0;

    #[Serializer\Groups([PlayerProfile::READ])]
    public int $competitionsWon = 0;

    #[Serializer\Groups([PlayerProfile::READ])]
    public int $matchesPlayed = 0;

    #[Serializer\Groups([PlayerProfile::READ])]
    public int $matchesWon = 0;

    public function addStatistics(Statistics $statistics): void
    {
        $this->competitionsWon += $statistics->competitionsWon;
        $this->competitionsPlayed += $statistics->competitionsPlayed;
        $this->matchesWon += $statistics->matchesWon;
        $this->matchesPlayed += $statistics->matchesPlayed;
    }
}
