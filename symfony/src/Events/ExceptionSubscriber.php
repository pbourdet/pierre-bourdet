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
    private const SERVER_ERROR_EXCEPTION = 500;

    /**
     * @return array<array>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => [['processException', -2]],
        ];
    }

    public function processException(ExceptionEvent $event): void
    {
        /** @var HttpException $exception */
        $exception = $event->getThrowable();
        $statusCode = method_exists($exception, 'getStatusCode')
            ? $exception->getStatusCode()
            : self::SERVER_ERROR_EXCEPTION
        ;

        $event->setResponse(new JsonResponse([
                    'code' => $statusCode,
                    'message' => $exception->getMessage(),
                ],
                $statusCode
            )
        );
    }
}
