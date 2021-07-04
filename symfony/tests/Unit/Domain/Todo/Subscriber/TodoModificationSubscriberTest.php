<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Todo\Subscriber;

use App\Entity\Todo;
use App\Entity\User;
use App\Security\UserAuthorizationChecker;
use Domain\Todo\Subscriber\TodoModificationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class TodoModificationSubscriberTest extends TestCase
{
    /** @var UserAuthorizationChecker|MockObject */
    private $userAuthorizationChecker;

    private TodoModificationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->userAuthorizationChecker = $this->getMockBuilder(UserAuthorizationChecker::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;

        $this->testedObject = new TodoModificationSubscriber(
            $this->userAuthorizationChecker
        );
    }

    public function testGetSubscribedEvents(): void
    {
        $this->assertArrayHasKey(KernelEvents::VIEW, TodoModificationSubscriber::getSubscribedEvents());
    }

    public function testCheck(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $todo = $this->getMockBuilder(Todo::class)->getMock();
        $todo->expects($this->once())->method('getUser')->willReturn($user);

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_PUT);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $this->userAuthorizationChecker->expects($this->once())->method('check')->with($user);

        $event = new ViewEvent($httpKernel, $request, 1, $todo);

        $this->testedObject->check($event);
    }

    public function testCheckWithWrongMethod(): void
    {
        $todo = $this->getMockBuilder(Todo::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_GET);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $todo);

        $this->testedObject->check($event);
    }

    public function testCheckWithWrongResource(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_DELETE);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->testedObject->check($event);
    }
}
