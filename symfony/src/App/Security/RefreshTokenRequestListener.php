<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\RouterInterface;

class RefreshTokenRequestListener implements EventSubscriberInterface
{
    public function __construct(
        private readonly RouterInterface $router
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onRefreshToken'],
        ];
    }

    public function onRefreshToken(RequestEvent $event): void
    {
        $refreshTokenUrl = $this->router->generate('gesdinet_jwt_refresh_token');
        $request = $event->getRequest();

        if ($refreshTokenUrl !== $request->getRequestUri()) {
            return;
        }

        $request->initialize(
            $request->query->all(),
            $request->request->all(),
            $request->attributes->all(),
            $request->cookies->all(),
            $request->files->all(),
            $request->server->all(),
            (string) json_encode(['refreshToken' => $request->cookies->get('REFRESH_TOKEN')], JSON_THROW_ON_ERROR)
        );
    }
}
