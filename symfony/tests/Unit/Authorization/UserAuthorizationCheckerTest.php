<?php

declare(strict_types=1);

namespace App\Tests\Authorization;

use App\Authorization\UserAuthorizationChecker;
use App\Entity\User;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Security;

class UserAuthorizationCheckerTest extends TestCase
{
    /** @var MockObject|Security */
    private $security;

    private UserAuthorizationChecker $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new UserAuthorizationChecker(
            $this->security
        );
    }

    public function testCheck(): void
    {
        $loggedInUser = $this->getMockBuilder(User::class)->getMock();
        $user = $this->getMockBuilder(User::class)->getMock();

        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($loggedInUser);

        $user->method('getId')->willReturn(1);
        $loggedInUser->method('getId')->willReturn(1);

        $this->testedObject->check($user);

        $this->doesNotPerformAssertions();
    }

    public function testCheckNoLoggedInUser(): void
    {
        $this->expectException(UnauthorizedHttpException::class);

        $user = $this->getMockBuilder(User::class)->getMock();

        $this->security
            ->method('getUser')
            ->willReturn(null);

        $this->testedObject->check($user);
    }

    public function testCheckWithDifferentUser(): void
    {
        $this->expectException(UnauthorizedHttpException::class);

        $loggedInUser = $this->getMockBuilder(User::class)->getMock();
        $user = $this->getMockBuilder(User::class)->getMock();

        $this->security
            ->method('getUser')
            ->willReturn($loggedInUser);

        $user->method('getId')->willReturn(1);
        $loggedInUser->method('getId')->willReturn(2);

        $this->testedObject->check($user);
    }
}
