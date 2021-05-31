<?php

declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Paths;
use ApiPlatform\Core\OpenApi\OpenApi;

final class OpenApiDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);

        $paths = $openApi->getPaths()->getPaths();
        $filteredPaths = new Paths();

        foreach ($paths as $path => $pathItem) {
            if ('/todos/{id}' === $path) {
                $pathItem = $pathItem->withGet(null);
            }

            $filteredPaths->addPath((string) $path, $pathItem);
        }

        return $openApi->withPaths($filteredPaths);
    }
}
