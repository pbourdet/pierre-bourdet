<?php

declare(strict_types=1);

namespace Infrastructure\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Operation;
use ApiPlatform\Core\OpenApi\Model\PathItem;
use ApiPlatform\Core\OpenApi\Model\RequestBody;
use ApiPlatform\Core\OpenApi\OpenApi;
use Symfony\Component\HttpFoundation\Response;

class SecurityDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private readonly OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $openApi->getPaths()->addPath('/security/login', $this->createLoginPath($schemas));
        $openApi->getPaths()->addPath('/security/refresh-token', $this->createRefreshTokenPath());
        $openApi->getPaths()->addPath('/security/logout', $this->createLogoutPath());

        return $openApi;
    }

    private function createLoginPath(?\ArrayObject $schemas): PathItem
    {
        $schemas['Credentials'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'username' => [
                    'type' => 'string',
                    'example' => 'test@test.fr',
                ],
                'password' => [
                    'type' => 'string',
                    'example' => '123456',
                ],
            ],
        ]);

        return new PathItem(
            ref: 'JWT Token',
            post: new Operation(
                operationId: 'login',
                tags: ['Security'],
                responses: [
                    Response::HTTP_NO_CONTENT => [
                        'description' => 'Authentication successful',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                    Response::HTTP_UNAUTHORIZED => [
                        'description' => 'Authentication failed',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                ],
                summary: 'Get JWT token to login.',
                requestBody: new RequestBody(
                    description: 'Generate new JWT Token',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Credentials',
                            ],
                        ],
                    ]),
                ),
                security: [],
            ),
        );
    }

    private function createRefreshTokenPath(): PathItem
    {
        return new PathItem(
            ref: 'Refresh Token',
            post: new Operation(
                operationId: 'refreshToken',
                tags: ['Security'],
                responses: [
                    Response::HTTP_NO_CONTENT => [
                        'description' => 'Token successfully refreshed',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                    Response::HTTP_UNAUTHORIZED => [
                        'description' => 'Token could not be refreshed',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                ],
                summary: 'Get new JWT from refresh token.',
                requestBody: new RequestBody(
                    description: 'Refresh JW Token',
                    content: new \ArrayObject([
                        'application/json' => [],
                    ]),
                ),
                security: [],
            ),
        );
    }

    private function createLogoutPath(): PathItem
    {
        return new PathItem(
            ref: 'Logout',
            post: new Operation(
                operationId: 'logout',
                tags: ['Security'],
                responses: [
                    Response::HTTP_NO_CONTENT => [
                        'description' => 'User logged out',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                ],
                summary: 'Logout user',
                requestBody: new RequestBody(
                    description: 'Logout user',
                    content: new \ArrayObject([
                        'application/json' => [],
                    ]),
                ),
                security: [],
            ),
        );
    }
}
