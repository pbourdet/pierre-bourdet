<?php

declare(strict_types=1);

namespace App\Tests\Unit\Entity;

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
}
