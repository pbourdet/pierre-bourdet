<?php

declare(strict_types=1);

namespace App\Tests\Unit\Entity;

use App\Entity\Todo;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class TodoTest extends TestCase
{
    private Todo $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new Todo();
    }

    public function testGetName(): void
    {
        $name = 'lessive';

        $todo = $this->testedObject->setName($name);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals($name, $this->testedObject->getName());
    }

    public function testGetDescription(): void
    {
        $description = 'faire la lessive';

        $todo = $this->testedObject->setDescription($description);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals($description, $this->testedObject->getDescription());
    }

    public function testGetDate(): void
    {
        $date = new \DateTime('tomorrow');

        $todo = $this->testedObject->setDate($date);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals($date, $this->testedObject->getDate());
    }

    public function testIsDone(): void
    {
        $todo = $this->testedObject->setIsDone(false);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals(false, $this->testedObject->isDone());
    }

    public function testGetUser(): void
    {
        $user = new User();

        $todo = $this->testedObject->setUser($user);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals($user, $this->testedObject->getUser());
    }
}
