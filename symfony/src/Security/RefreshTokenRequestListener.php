<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\RouterInterface;

class RefreshTokenRequestListener implements EventSubscriberInterface
{
    public RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest'],
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
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
            (string) json_encode(['refreshToken' => $request->cookies->get('REFRESH_TOKEN')])
        );
    }
}
