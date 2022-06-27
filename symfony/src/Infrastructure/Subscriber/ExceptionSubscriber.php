<?php

declare(strict_types=1);

namespace Infrastructure\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    /** @return array<string, string|array{0: string, 1: int}|list<array{0: string, 1?: int}>> */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => [['processException', -2]],
        ];
    }

    public function processException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $statusCode = method_exists($exception, 'getStatusCode')
            ? $exception->getStatusCode()
            : Response::HTTP_INTERNAL_SERVER_ERROR
        ;

        $event->setResponse(
            new JsonResponse(
                [
                    'code' => $statusCode,
                    'message' => $exception->getMessage(),
                ],
                $statusCode
            )
        );
    }
}
