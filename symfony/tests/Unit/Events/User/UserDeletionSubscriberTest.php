<?php

declare(strict_types=1);

namespace App\Tests\Unit\Events\User;

use App\Authorization\UserAuthorizationChecker;
use App\Entity\Todo;
use App\Entity\User;
use App\Events\User\UserDeletionSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class UserDeletionSubscriberTest extends TestCase
{
    /** @var UserAuthorizationChecker|MockObject */
    private $userAuthorizationChecker;

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

        $this->testedObject->check($event);
    }

    public function testCheckWithWrongResource(): void
    {
        $resource = $this->getMockBuilder(Todo::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $resource);

        $this->testedObject->check($event);
    }
}
