<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\User\Subscriber;

use App\Entity\Todo;
use App\Entity\User;
use Domain\User\Subscriber\UserCreationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserCreationSubscriberTest extends TestCase
{
    private UserPasswordHasherInterface|MockObject $hasher;

    private UserCreationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->hasher = $this->createMock(UserPasswordHasherInterface::class);

        $this->testedObject = new UserCreationSubscriber(
            $this->hasher
        );
    }

    public function testGetSubscribedEvents(): void
    {
        $this->assertArrayHasKey(KernelEvents::VIEW, UserCreationSubscriber::getSubscribedEvents());
    }

    public function testEncodePassword(): void
    {
        $password = '123456';
        $encodedPassword = 'IZEKSC';

        $user = $this->getMockBuilder(User::class)->getMock();
        $user->expects($this->once())->method('getPassword')->willReturn($password);
        $user->expects($this->once())->method('setPassword')->with($encodedPassword);

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $this->hasher->expects($this->once())->method('hashPassword')->with($user, $password)->willReturn($encodedPassword);

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->testedObject->encodePassword($event);
    }

    public function testEncodePasswordWithWrongMethod(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_GET);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $user);

        $this->testedObject->encodePassword($event);
    }

    public function testEncodePasswordWithWrongResource(): void
    {
        $resource = $this->getMockBuilder(Todo::class)->getMock();

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ViewEvent($httpKernel, $request, 1, $resource);

        $this->testedObject->encodePassword($event);
    }
}
