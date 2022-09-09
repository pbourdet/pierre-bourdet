<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Tennis\Listener;

use Domain\Tennis\Listener\LocaleListener;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class LocaleListenerTest extends TestCase
{
    private LocaleListener $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new LocaleListener();
    }

    public function testOnKernelReques(): void
    {
        $headers = $this->createMock(ParameterBag::class);
        $headers->expects($this->once())->method('get')->willReturn('fr-FR');

        $request = $this->createMock(Request::class);
        $request->headers = $headers;
        $request->expects($this->once())->method('getRequestUri')->willReturn('/tennis/rankings');
        $request->expects($this->once())->method('setLocale')->with('fr');

        $requestEvent = $this->createMock(RequestEvent::class);
        $requestEvent->expects($this->once())->method('getRequest')->willReturn($request);

        $this->testedObject->onKernelRequest($requestEvent);
    }

    public function testOnKernelRequestWithNonSupportedUri(): void
    {
        $headers = $this->createMock(ParameterBag::class);
        $headers->expects($this->never())->method('get');

        $request = $this->createMock(Request::class);
        $request->headers = $headers;
        $request->expects($this->once())->method('getRequestUri')->willReturn('/todo/1');

        $requestEvent = $this->createMock(RequestEvent::class);
        $requestEvent->expects($this->once())->method('getRequest')->willReturn($request);

        $this->testedObject->onKernelRequest($requestEvent);
    }

    public function testOnKernelRequestWithNullHeader(): void
    {
        $headers = $this->createMock(ParameterBag::class);
        $headers->expects($this->once())->method('get')->willReturn(null);

        $request = $this->createMock(Request::class);
        $request->headers = $headers;
        $request->expects($this->once())->method('getRequestUri')->willReturn('/tennis/rankings');
        $request->expects($this->never())->method('setLocale');

        $requestEvent = $this->createMock(RequestEvent::class);
        $requestEvent->expects($this->once())->method('getRequest')->willReturn($request);

        $this->testedObject->onKernelRequest($requestEvent);
    }

    public function testOnKernelRequestWithNonSupportedLanguage(): void
    {
        $headers = $this->createMock(ParameterBag::class);
        $headers->expects($this->once())->method('get')->willReturn('es-ES');

        $request = $this->createMock(Request::class);
        $request->headers = $headers;
        $request->expects($this->once())->method('getRequestUri')->willReturn('/tennis/rankings');
        $request->expects($this->never())->method('setLocale');

        $requestEvent = $this->createMock(RequestEvent::class);
        $requestEvent->expects($this->once())->method('getRequest')->willReturn($request);

        $this->testedObject->onKernelRequest($requestEvent);
    }
}
