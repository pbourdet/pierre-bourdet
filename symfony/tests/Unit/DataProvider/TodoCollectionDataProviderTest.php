<?php

namespace App\Tests\Unit\DataProvider;

use App\DataProvider\TodoCollectionDataProvider;
use App\Entity\Todo;
use App\Entity\User;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class TodoCollectionDataProviderTest extends TestCase
{
    /** @var MockObject|Security */
    private $security;

    private TodoCollectionDataProvider $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->testedObject = new TodoCollectionDataProvider(
            $this->security
        );
    }

    public function dataSupports(): array
    {
        return [
            'case false' => [
                'resourceClass' => 'RandomClass',
                'expected' => false,
            ],
            'case true' => [
                'resourceClass' => Todo::class,
                'expected' => true,
            ],
        ];
    }

    /**
     * @dataProvider dataSupports
     */
    public function testSupports(string $resourceClass, bool $expected): void
    {
        $actual = $this->testedObject->supports($resourceClass);

        $this->assertEquals($expected, $actual);
    }

    public function testGetCollection(): void
    {
        $user = $this->getMockBuilder(User::class)->getMock();
        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $actual = $this->testedObject->getCollection('Todo');

        $this->assertCount(0, $actual);
    }
}
