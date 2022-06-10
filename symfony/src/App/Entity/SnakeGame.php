<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Action\NotFoundAction;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[
    ORM\Entity,
    ApiResource(
        collectionOperations: [
            'post' => [
                'path' => '/games/snake',
                'denormalization_context' => [
                    'groups' => [Game::CREATE_GROUP],
                ],
                'normalization_context' => [
                    'groups' => [Game::READ_COLLECTION_USER_GROUP],
                ],
            ],
            SnakeGame::USER_GAMES_OPERATION_NAME => [
                'method' => Request::METHOD_GET,
                'path' => '/games/snake/user',
                'normalization_context' => [
                    'groups' => [Game::READ_COLLECTION_USER_GROUP],
                ],
                'openapi_context' => [
                    'summary' => 'Retrieves the user five best snake games.',
                    'description' => 'Retrieves the user five best games.',
                    'responses' => [
                        Response::HTTP_OK => [
                            'description' => 'Games successfully retrieved.',
                            'content' => [
                                'application/json' => [],
                            ],
                        ],
                    ],
                ],
            ],
            SnakeGame::TOP_GAMES_OPERATION_NAME => [
                'method' => Request::METHOD_GET,
                'path' => '/games/snake/top',
                'normalization_context' => [
                    'groups' => [Game::READ_COLLECTION_TOP_GROUP],
                ],
                'openapi_context' => [
                    'summary' => 'Retrieves the five best snake games.',
                    'security' => [],
                    'description' => 'Retrieves the five best games.',
                    'responses' => [
                        Response::HTTP_OK => [
                            'description' => 'Games successfully retrieved.',
                            'content' => [
                                'application/json' => [],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        itemOperations: [
            'get' => [
                'controller' => NotFoundAction::class,
                'read' => false,
                'output' => false,
                'path' => '/games/snake/{id}',
            ],
        ],
        formats: ['json']
    )
]
class SnakeGame extends Game
{
    final public const TOP_GAMES_OPERATION_NAME = 'getTopGames';
    final public const USER_GAMES_OPERATION_NAME = 'getUserGames';
}
