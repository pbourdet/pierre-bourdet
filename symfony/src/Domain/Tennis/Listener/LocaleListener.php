<?php

declare(strict_types=1);

namespace Domain\Tennis\Listener;

use Model\Account\Enum\LanguageEnum;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class LocaleListener implements EventSubscriberInterface
{
    /** @return array<string, string|array{0: string, 1: int}|list<array{0: string, 1?: int}>> */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest', 17],
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (false === str_starts_with($request->getRequestUri(), '/tennis/')) {
            return;
        }

        $language = $request->headers->get('accept-language');

        if (null === $language || false === in_array($language, LanguageEnum::getIsoLanguages(), true)) {
            return;
        }

        $request->setLocale(LanguageEnum::resolveLanguage($language));
    }
}
