<?php

declare(strict_types=1);

namespace App\Events\Todo;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Todo;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class TodoCreationSubscriber implements EventSubscriberInterface
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @return array<array>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['setTodoUser', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function setTodoUser(ViewEvent $event): void
    {
        $todo = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($todo instanceof Todo && Request::METHOD_POST === $method) {
            /** @var UserInterface $user */
            $user = $this->security->getUser();
            $todo->setUser($user);
        }
    }
}
