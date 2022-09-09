<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\User\DataTransformer;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\User;
use Domain\User\DataTransformer\CreateUserDataTransformer;
use Model\User\CreateUserDTO;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class CreateUserDataTransformerTest extends TestCase
{
    private MockObject|ValidatorInterface $validator;

    private CreateUserDataTransformer $testedObject;

    protected function setUp(): void
    {
        $this->validator = $this->createMock(ValidatorInterface::class);
        $this->testedObject = new CreateUserDataTransformer($this->validator);
    }

    /** @dataProvider dataSupportsTransformation */
    public function testSupportsTransformation(array $context, bool $expected): void
    {
        $this->assertSame($expected, $this->testedObject->supportsTransformation([], 'to', $context));
    }

    public function dataSupportsTransformation(): array
    {
        return [
            'case index not set' => [
                'context' => ['input' => ['resource' => 'test']],
                'expected' => false,
            ],
            'case wrong class' => [
                'context' => ['input' => ['class' => 'wrong class']],
                'expected' => false,
            ],
            'case true' => [
                'context' => ['input' => ['class' => CreateUserDTO::class]],
                'expected' => true,
            ],
        ];
    }

    public function testTransform(): void
    {
        $object = new CreateUserDTO();
        $object->setEmail('test@test.com');
        $object->setNickname('test');
        $object->setLanguage('fr-FR');
        $object->setPassword('password');

        $this->validator
            ->expects($this->once())
            ->method('validate')
            ->with($object);

        $actual = $this->testedObject->transform($object, 'to');

        $this->assertInstanceOf(User::class, $actual);
        $this->assertSame('test@test.com', $actual->getEmail());
        $this->assertSame('test', $actual->getNickname());
        $this->assertSame('fr', $actual->getLanguage());
        $this->assertSame('password', $actual->getPassword());
    }
}
