<?php

declare(strict_types=1);

namespace App\Listener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class LocaleListener implements EventSubscriberInterface
{
    private const EN_LANGUAGE = 'en-GB';
    private const FR_LANGUAGE = 'fr-FR';

    private const EN_LOCALE = 'en';
    private const FR_LOCALE = 'fr';

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest', 17],
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        $language = $request->headers->get('accept-language');

        if (!in_array($language, [self::EN_LANGUAGE, self::FR_LANGUAGE])) {
            return;
        }

        $locale = self::EN_LANGUAGE === $language ? self::EN_LOCALE : self::FR_LOCALE;

        $request->setLocale($locale);
    }
}
