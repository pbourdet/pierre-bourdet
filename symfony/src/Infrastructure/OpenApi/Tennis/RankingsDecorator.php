<?php

declare(strict_types=1);

namespace Infrastructure\OpenApi\Tennis;

use ApiPlatform\Core\JsonSchema\Schema;
use ApiPlatform\Core\JsonSchema\SchemaFactoryInterface;
use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Operation;
use ApiPlatform\Core\OpenApi\Model\Parameter;
use ApiPlatform\Core\OpenApi\Model\PathItem;
use ApiPlatform\Core\OpenApi\OpenApi;
use Model\Tennis\ExternalModel\Rankings\Ranking;
use Symfony\Component\HttpFoundation\Response;

class RankingsDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated,
        private SchemaFactoryInterface $schemaFactory
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);

        /** @var \ArrayObject $schemas */
        $schemas = $openApi->getComponents()->getSchemas();

        $schema = new Schema(Schema::VERSION_OPENAPI);
        $schema->setDefinitions($schemas);

        $this->schemaFactory->buildSchema(Ranking::class, format: 'json', schema: $schema);

        $pathItem = new PathItem(
            get: new Operation(
                operationId: 'getSinglesRanking',
                tags: ['Tennis'],
                responses: [
                    Response::HTTP_OK => [
                        'description' => 'Rankings successfully retrieved.',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Ranking',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Get singles ranking by competition type.',
                parameters: [new Parameter('competitionName', 'path', 'Competition name', required: true)],
                security: [],
            ),
        );

        $openApi->getPaths()->addPath('/tennis/singles-rankings/{competitionName}', $pathItem);

        return $openApi;
    }
}
