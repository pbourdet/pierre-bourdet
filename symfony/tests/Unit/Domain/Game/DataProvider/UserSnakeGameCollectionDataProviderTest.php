<?php

namespace Tests\Unit\Domain\Game\DataProvider;

use App\Entity\Game;
use App\Entity\SnakeGame;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Domain\Game\DataProvider\UserSnakeGameCollectionDataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class UserSnakeGameCollectionDataProviderTest extends TestCase
{
    /** @var MockObject|Security */
    private $security;

    private UserSnakeGameCollectionDataProvider $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new UserSnakeGameCollectionDataProvider(
            $this->security
        );
    }

    public function testGetCollection(): void
    {
        $games = new ArrayCollection();
        $games->add((new SnakeGame())->setScore(2));
        $games->add((new SnakeGame())->setScore(100));
        $games->add(($this->getMockBuilder(Game::class)->getMockForAbstractClass()));

        $user = $this->getMockBuilder(User::class)->getMock();
        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $user->expects($this->once())->method('getGames')->willReturn($games);

        $actual = $this->testedObject->getCollection(SnakeGame::class);

        $this->assertIsArray($actual);
        $this->assertCount(2, $actual);
        $this->assertEquals(100, current($actual)->getScore());
    }
}
