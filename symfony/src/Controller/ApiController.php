<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api", name="api")
     */
    public function index(): JsonResponse
    {
        $response = new Jsonresponse();
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode(['test' => 'ok']));
        $response->setStatusCode(200);

        return $response;
    }
}
