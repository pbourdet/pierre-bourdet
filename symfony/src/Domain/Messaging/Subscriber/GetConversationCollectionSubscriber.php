<?php

declare(strict_types=1);

namespace Domain\Messaging\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mercure\Authorization;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Security;

class GetConversationCollectionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly Authorization $authorization,
        private readonly RouterInterface $router,
        private readonly Security $security
    ) {
    }

    /** @return array<string, string|array{0: string, 1: int}|list<array{0: string, 1?: int}>> */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['setMercureCookie', EventPriorities::POST_SERIALIZE],
        ];
    }

    public function setMercureCookie(ViewEvent $event): void
    {
        $request = $event->getRequest();

        if ('api_conversations_get_collection' !== $request->attributes->get('_route') || Request::METHOD_GET !== $request->getMethod()) {
            return;
        }

        /** @var User $user */
        $user = $this->security->getUser();
        $userUrl = $this->router->generate(
            'api_users_get_item',
            ['id' => $user->getId()],
            UrlGeneratorInterface::ABSOLUTE_URL
        );

        $this->authorization->setCookie(
            $request,
            [sprintf('%s%s', $userUrl, '{?topic}')],
        );
    }
}
