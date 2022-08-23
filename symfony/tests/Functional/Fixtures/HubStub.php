<?php

declare(strict_types=1);

namespace Tests\Functional\Fixtures;

use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Jwt\LcobucciFactory;
use Symfony\Component\Mercure\Jwt\StaticTokenProvider;
use Symfony\Component\Mercure\Jwt\TokenFactoryInterface;
use Symfony\Component\Mercure\Jwt\TokenProviderInterface;
use Symfony\Component\Mercure\Update;

class HubStub implements HubInterface
{
    public function publish(Update $update): string
    {
        return 'id';
    }

    public function getUrl(): string
    {
        return '';
    }

    public function getPublicUrl(): string
    {
        return '';
    }

    public function getProvider(): TokenProviderInterface
    {
        return new StaticTokenProvider('token');
    }

    public function getFactory(): ?TokenFactoryInterface
    {
        return new LcobucciFactory('1234567890123456789012345678901234567890');
    }
}
