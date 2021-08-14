<?php

declare(strict_types=1);

namespace Model\Tennis\PlayerProfile;

use Symfony\Component\Serializer\Annotation as Serializer;

class Period
{
    #[Serializer\Groups([PlayerProfile::READ])]
    public int $year = 0;

    /** @var Surface[] */
    #[Serializer\Groups([PlayerProfile::READ])]
    public array $surfaces = [];

    #[Serializer\Groups([PlayerProfile::READ])]
    public Statistics $statistics;

    public function __construct()
    {
        $this->statistics = new Statistics();
    }

    public function addSurface(Surface $newSurface): void
    {
        $this->statistics->addStatistics($newSurface->statistics);

        $surface = $this->findSurface($newSurface);

        if (null === $surface) {
            $surface = new Surface();
            $surface->type = $newSurface->type;
            $surface->statistics->addStatistics($newSurface->statistics);

            $this->surfaces[] = $surface;

            return;
        }

        $surface->statistics->addStatistics($newSurface->statistics);
    }

    private function findSurface(Surface $searchedSurface): ?Surface
    {
        foreach ($this->surfaces as $surface) {
            if ($surface->type === $searchedSurface->type) {
                return $surface;
            }
        }

        return null;
    }
}
