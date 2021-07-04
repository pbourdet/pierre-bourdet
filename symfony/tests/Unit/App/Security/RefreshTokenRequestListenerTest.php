<?php

declare(strict_types=1);

namespace Tests\Unit\App\Security;

use App\Security\RefreshTokenRequestListener;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Routing\RouterInterface;

class RefreshTokenRequestListenerTest extends TestCase
{
    /** @var MockObject|RouterInterface */
    private $router;

    private RefreshTokenRequestListener $testedObject;

    protected function setUp(): void
    {
        $this->router = $this->getMockBuilder(RouterInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new RefreshTokenRequestListener(
            $this->router
        );
    }

    public function testOnKernelRequestOnRefreshToken(): void
    {
        $refreshTokenUrl = 'url';
        $token = 'token';

        $event = $this->getMockBuilder(RequestEvent::class)->disableOriginalConstructor()->getMock();
        $request = $this->getMockBuilder(Request::class)->getMock();
        $event->expects($this->once())->method('getRequest')->willReturn($request);

        $this->router->expects($this->once())->method('generate')
            ->with('gesdinet_jwt_refresh_token', [], 1)
            ->willReturn($refreshTokenUrl);

        $request->expects($this->once())->method('getRequestUri')->willReturn($refreshTokenUrl);

        $request->request = new ParameterBag();
        $request->query = new ParameterBag();
        $request->cookies = new ParameterBag(['REFRESH_TOKEN' => $token]);
        $request->files = new ParameterBag();
        $request->attributes = new ParameterBag();
        $request->server = new ParameterBag();

        $request->expects($this->once())
            ->method('initialize')
            ->with(
                [],
                [],
                [],
                ['REFRESH_TOKEN' => $token],
                [],
                [],
                json_encode(['refreshToken' => $token])
            );

        $this->testedObject->onRefreshToken($event);
    }

    public function testOnKernelRequestOnOtherUrl(): void
    {
        $refreshTokenUrl = 'url';
        $requestedUrl = 'other url';

        $event = $this->getMockBuilder(RequestEvent::class)->disableOriginalConstructor()->getMock();
        $request = $this->getMockBuilder(Request::class)->getMock();
        $event->expects($this->once())->method('getRequest')->willReturn($request);

        $this->router->expects($this->once())->method('generate')
            ->with('gesdinet_jwt_refresh_token', [], 1)
            ->willReturn($refreshTokenUrl);

        $request->expects($this->once())->method('getRequestUri')->willReturn($requestedUrl);

        $this->testedObject->onRefreshToken($event);
    }
}
