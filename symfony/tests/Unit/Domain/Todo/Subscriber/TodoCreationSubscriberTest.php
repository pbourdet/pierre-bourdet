<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Todo\Subscriber;

use App\Entity\Todo;
use App\Entity\User;
use Domain\Todo\Subscriber\TodoCreationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class TodoCreationSubscriberTest extends TestCase
{
    private Security|MockObject $security;

    private TodoCreationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->getMockBuilder(Security::class)->disableOriginalConstructor()->getMock();

        $this->testedObject = new TodoCreationSubscriber(
            $this->security
        );
    }

    public function testGetSubscribedEvents(): void
    {
        $this->assertArrayHasKey(KernelEvents::VIEW, TodoCreationSubscriber::getSubscribedEvents());
    }

    public function testSetTodoUser(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $todo = $this->getMockBuilder(Todo::class)->getMock();
        $todo->expects($this->once())->method('setUser')->with($user);

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $this->security->expects($this->once())->method('getUser')->willReturn($user);

        $event = new ViewEvent($httpKernel, $request, 1, $todo);

        $this->testedObject->setTodoUser($event);
    }

    public function testSetTodoUserWithWrongMethod(): void
    {
        $todo = $this->getMockBuilder(Todo::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_DELETE);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $todo);

        $this->testedObject->setTodoUser($event);
    }

    public function testSetTodoUserWithWrongResource(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->testedObject->setTodoUser($event);
    }
}
