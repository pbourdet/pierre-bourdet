<?php

declare(strict_types=1);

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    /**
     * @return array<array>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => [['processException', 0]],
        ];
    }

    public function processException(ExceptionEvent $event): void
    {
        /** @var HttpException $exception */
        $exception = $event->getThrowable();

        $event->setResponse(new JsonResponse([
                    'code' => $exception->getStatusCode(),
                    'message' => $exception->getMessage(),
                ],
                $exception->getStatusCode()
            )
        );
    }
}
