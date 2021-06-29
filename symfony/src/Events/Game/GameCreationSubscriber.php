<?php

declare(strict_types=1);

namespace App\Events\Game;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Game;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class GameCreationSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private Security $security
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['setGameUser', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function setGameUser(ViewEvent $event): void
    {
        $game = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($game instanceof Game && Request::METHOD_POST === $method) {
            /** @var User $user */
            $user = $this->security->getUser();
            $game->setUser($user);
        }
    }
}
