<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Game\Subscriber;

use App\Entity\SnakeGame;
use App\Entity\User;
use Domain\Game\Subscriber\GameCreationSubscriber;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Security\Core\Security;

class GameCreationSubscriberTest extends TestCase
{
    private MockObject|Security $security;

    private GameCreationSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->createMock(Security::class);

        $this->testedObject = new GameCreationSubscriber(
            $this->security
        );
    }

    /** @dataProvider dataSetGameUserWithUnsupportedEvent */
    public function testSetGameUserWithUnsupportedEvent(object $controllerResult, string $method): void
    {
        $request = $this->createMock(Request::class);
        $httpKernel = $this->createMock(HttpKernelInterface::class);
        $request->expects($this->once())->method('getMethod')->willReturn($method);

        $event = new ViewEvent($httpKernel, $request, 1, $controllerResult);

        $this->security
            ->expects($this->never())
            ->method('getUser');

        $this->testedObject->setGameUser($event);
    }

    public function dataSetGameUserWithUnsupportedEvent(): array
    {
        return [
            'case unsupported class' => [
                'controllerResult' => new User(),
                'method' => Request::METHOD_POST,
            ],
            'case unsupported method' => [
                'controllerResult' => new SnakeGame(),
                'method' => Request::METHOD_DELETE,
            ],
        ];
    }

    public function testSetGameUser(): void
    {
        $game = new SnakeGame();
        $user = new User();
        $request = $this->createMock(Request::class);
        $httpKernel = $this->createMock(HttpKernelInterface::class);
        $request->expects($this->once())->method('getMethod')->willReturn(Request::METHOD_POST);

        $event = new ViewEvent($httpKernel, $request, 1, $game);

        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $this->testedObject->setGameUser($event);

        $this->assertSame($user, $game->getUser());
    }
}
