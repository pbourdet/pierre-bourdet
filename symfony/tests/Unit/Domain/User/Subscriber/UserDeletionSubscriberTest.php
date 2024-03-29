<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\User\Subscriber;

use App\Entity\Todo;
use App\Entity\User;
use App\Security\UserAuthorizationChecker;
use Domain\User\Subscriber\UserDeletionSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class UserDeletionSubscriberTest extends TestCase
{
    private UserAuthorizationChecker|MockObject $userAuthorizationChecker;

    private UserDeletionSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->userAuthorizationChecker = $this->getMockBuilder(UserAuthorizationChecker::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;

        $this->testedObject = new UserDeletionSubscriber(
            $this->userAuthorizationChecker
        );
    }

    public function testGetSubscribedEvents(): void
    {
        $this->assertArrayHasKey(KernelEvents::VIEW, UserDeletionSubscriber::getSubscribedEvents());
    }

    public function testCheck(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_DELETE);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $this->userAuthorizationChecker->expects($this->once())->method('check')->with($user);

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->testedObject->check($event);
    }

    public function testCheckWithWrongMethod(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->userAuthorizationChecker->expects($this->never())->method('check')->with($user);

        $this->testedObject->check($event);
    }

    public function testCheckWithWrongResource(): void
    {
        $resource = $this->getMockBuilder(Todo::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_DELETE);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $resource);

        $this->userAuthorizationChecker->expects($this->never())->method('check')->with($resource);

        $this->testedObject->check($event);
    }
}
