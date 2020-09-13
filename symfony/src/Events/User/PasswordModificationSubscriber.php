<?php

declare(strict_types=1);

namespace App\Events\User;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordModificationSubscriber implements EventSubscriberInterface
{
    private const METHODS_ALLOWED = [
        Request::METHOD_POST,
    ];

    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->encoder = $userPasswordEncoder;
    }

    /**
     * @return array<array>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE],
        ];
    }

    public function encodePassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($user instanceof User && in_array($method, self::METHODS_ALLOWED)) {
            $user->setPassword($this->encoder->encodePassword($user, $user->getPassword()));
        }
    }
}
