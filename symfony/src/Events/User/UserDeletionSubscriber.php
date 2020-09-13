<?php

declare(strict_types=1);

namespace App\Events\User;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Authorization\UserAuthorizationChecker;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserDeletionSubscriber implements EventSubscriberInterface
{
    private UserAuthorizationChecker $userAuthorizationChecker;

    public function __construct(UserAuthorizationChecker $userAuthorizationChecker)
    {
        $this->userAuthorizationChecker = $userAuthorizationChecker;
    }

    /**
     * @return array<array>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['check', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function check(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($user instanceof User && Request::METHOD_DELETE === $method) {
            $this->userAuthorizationChecker->check($user);
        }
    }
}
