<?php

declare(strict_types=1);

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

/**
 * The gesdinet/jwt-refresh-token-bundle does not support cookies at the moment.
 * This class will allow us to transmit the refresh token through httpOnly cookies until the bundle
 * supports this feature.
 * See : https://github.com/markitosgv/JWTRefreshTokenBundle/pull/199.
 */
class AuthenticationSuccessListener
{
    final public const REFRESH_TOKEN_COOKIE_NAME = 'REFRESH_TOKEN';

    public function __construct(
        private readonly string $refreshTokenTtl
    ) {
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        /** @var array{token: string, refreshToken: string} $data */
        $data = $event->getData();

        $event->getResponse()->headers->setCookie(
            new Cookie(
                self::REFRESH_TOKEN_COOKIE_NAME,
                $data['refreshToken'],
                (new \DateTime())->add(new \DateInterval(sprintf('PT%sS', $this->refreshTokenTtl))),
                '/',
                null,
                true,
                true,
                false,
                'none'
            )
        );

        unset($data['refreshToken']);
        $event->setData($data);
    }
}
