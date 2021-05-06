<?php

declare(strict_types=1);

namespace App\Swagger;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * See https://api-platform.com/docs/core/swagger/#overriding-the-openapi-specification.
 */
final class SwaggerDecorator implements NormalizerInterface
{
    private NormalizerInterface $decorated;

    public function __construct(NormalizerInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    public function supportsNormalization($data, string $format = null): bool
    {
        return $this->decorated->supportsNormalization($data, $format);
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        /** @var array<mixed> $docs */
        $docs = $this->decorated->normalize($object, $format, $context);

        unset($docs['paths']['/todos/{id}']['get']);

        $docs['components']['schemas']['Credentials'] = [
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
        ];

        $tokenDocumentation = [
            'paths' => [
                '/security/login' => [
                    'post' => [
                        'tags' => ['Security'],
                        'operationId' => 'postCredentialsItem',
                        'summary' => 'Get JWT token to login.',
                        'requestBody' => [
                            'description' => 'Create new JWT Token',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        '$ref' => '#/components/schemas/Credentials',
                                    ],
                                ],
                            ],
                        ],
                        'responses' => [
                            Response::HTTP_NO_CONTENT => [
                                'description' => 'Authentication successful',
                            ],
                            Response::HTTP_UNAUTHORIZED => [
                                'description' => 'Authentication failed',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $refreshDocumentation = [
            'paths' => [
                '/security/refresh-token' => [
                    'post' => [
                        'tags' => ['Security'],
                        'operationId' => 'postRefreshToken',
                        'summary' => 'Get new JWT Token from refresh token.',
                        'requestBody' => [
                            'description' => 'Refresh JWT Token',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        '$ref' => '#/components/schemas/RefreshToken',
                                    ],
                                ],
                            ],
                        ],
                        'responses' => [
                            Response::HTTP_NO_CONTENT => [
                                'description' => 'Token successfully refreshed',
                            ],
                            Response::HTTP_UNAUTHORIZED => [
                                'description' => 'Token could not be refreshed',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        return array_merge_recursive($docs, $tokenDocumentation, $refreshDocumentation);
    }
}
