<?php

declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Operation;
use ApiPlatform\Core\OpenApi\Model\PathItem;
use ApiPlatform\Core\OpenApi\Model\Paths;
use ApiPlatform\Core\OpenApi\OpenApi;
use App\Controller\Account\UpdateLanguageController;
use App\Controller\Account\UpdatePasswordController;
use App\Controller\Contact\ContactMeController;
use App\Controller\Security\ResetPasswordController;
use App\Controller\Security\SendResetPasswordEmailController;

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

            if ('/games/snake/{id}' === $path) {
                $pathItem = $pathItem->withGet(null);
            }

            if (in_array($path, [
                UpdatePasswordController::PATH,
                ResetPasswordController::PATH,
                UpdateLanguageController::PATH,
                ContactMeController::PATH,
                SendResetPasswordEmailController::PATH,
            ])) {
                $pathItem = $this->unset204And422Responses($pathItem);
            }

            $filteredPaths->addPath((string) $path, $pathItem);
        }

        return $openApi->withPaths($filteredPaths);
    }

    private function unset204And422Responses(PathItem $pathItem): PathItem
    {
        /** @var Operation $post */
        $post = $pathItem->getPost();
        $responses = $post->getResponses();
        unset($responses[204], $responses[422]);

        $post = $post->withResponses($responses);

        return $pathItem->withPost($post);
    }
}
