<?php

declare(strict_types=1);

namespace Tests\Unit\App\Entity;

use App\Entity\Game;
use App\Entity\SnakeGame;
use App\Entity\Todo;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private User $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new User();
    }

    public function testGetEmail(): void
    {
        $email = 'test@test.fr';

        $user = $this->testedObject->setEmail($email);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($email, $this->testedObject->getEmail());
        $this->assertEquals($email, $this->testedObject->getUsername());
    }

    public function testGetRoles(): void
    {
        $roleAdmin = ['ROLE_ADMIN'];

        $user = $this->testedObject->setRoles($roleAdmin);

        $this->assertInstanceOf(User::class, $user);
        $this->assertContains('ROLE_USER', $this->testedObject->getRoles());
        $this->assertContains('ROLE_ADMIN', $this->testedObject->getRoles());
    }

    public function getPassword(): void
    {
        $password = 'password';

        $user = $this->testedObject->setPassword($password);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($password, $this->testedObject->getPassword());
    }

    public function testGetUpdatedAt(): void
    {
        $updatedAt = new \DateTimeImmutable();

        $user = $this->testedObject->setUpdatedAt($updatedAt);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($updatedAt, $user->getUpdatedAt());
    }

    public function testEraseCredentials(): void
    {
        $this->assertNull($this->testedObject->eraseCredentials());
    }

    public function testAddTodo(): void
    {
        $todo = new Todo();

        $user = $this->testedObject->addTodo($todo);

        $this->assertInstanceOf(User::class, $user);
        $this->assertContains($todo, $user->getTodos());
    }

    public function testRemoveTodo(): void
    {
        $todo = new Todo();
        $user = $this->testedObject
            ->addTodo($todo)
            ->removeTodo($todo)
        ;

        $this->assertInstanceOf(User::class, $user);
        $this->assertNotContains($todo, $user->getTodos());
    }

    public function testGetNickname(): void
    {
        $nickname = 'spiderman';

        $user = $this->testedObject->setNickname($nickname);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($nickname, $user->getNickname());
    }

    public function testHasBeenUpdated(): void
    {
        $now = new \DateTimeImmutable();
        $this->testedObject->hasBeenUpdated();

        $this->assertEquals($now->format('d/m/Y H:i'), $this->testedObject->getUpdatedAt()->format('d/m/Y H:i'));
    }

    public function testGetGamesByType(): void
    {
        $this->testedObject->addGame((new SnakeGame())->setScore(2));
        $this->testedObject->addGame((new SnakeGame())->setScore(100));
        $this->testedObject->addGame($this->getMockBuilder(Game::class)->getMockForAbstractClass());

        $actual = $this->testedObject->getGamesByType(SnakeGame::class);

        $this->assertIsArray($actual);
        $this->assertCount(2, $actual);
        $this->assertEquals(100, current($actual)->getScore());
    }
}
