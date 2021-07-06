<?php

declare(strict_types=1);

namespace App\Controller\Tennis\Rankings;

use Domain\Tennis\Repository\RankingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SinglesRankingsController extends AbstractController
{
    public function __construct(
        private RankingsRepository $rankingsRepository
    ) {
    }

    #[Route('/tennis/singles-rankings', name: 'tennis_get_singles_rankings', methods: [Request::METHOD_GET])]
    public function __invoke(Request $request): JsonResponse
    {
        $rankingName = (string) $request->query->get('name');

        $singlesRankings = $this->rankingsRepository->getSinglesRankingsByName($rankingName);

        return $this->json($singlesRankings);
    }
}
