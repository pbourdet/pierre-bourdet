<?php

declare(strict_types=1);

namespace Infrastructure\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model;
use ApiPlatform\Core\OpenApi\OpenApi;
use Symfony\Component\HttpFoundation\Response;

class RefreshTokenDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);

        $pathItem = new Model\PathItem(
            ref: 'Refresh Token',
            post: new Model\Operation(
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
                requestBody: new Model\RequestBody(
                    description: 'Refresh JW Token',
                    content: new \ArrayObject([
                        'application/json' => [],
                    ]),
                ),
                security: [],
            ),
        );

        $openApi->getPaths()->addPath('/security/refresh-token', $pathItem);

        return $openApi;
    }
}
