<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Todo\DataTransformer;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Todo;
use App\Entity\User;
use Domain\Todo\DataTransformer\PersistTodoDataTransformer;
use Model\Todo\PersistTodoDTO;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;

class PersistTodoDataTransformerTest extends TestCase
{
    private MockObject|Security $security;
    private MockObject|ValidatorInterface $validator;

    private PersistTodoDataTransformer $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->createMock(Security::class);
        $this->validator = $this->createMock(ValidatorInterface::class);

        $this->testedObject = new PersistTodoDataTransformer(
            $this->security,
            $this->validator,
        );
    }

    public function dataSupportsTransformation(): array
    {
        return [
            'case wrong class' => [
                'context' => ['input' => ['class' => User::class]],
                'expected' => false,
            ],
            'case not set' => [
                'context' => ['input' => ['key' => PersistTodoDTO::class]],
                'expected' => false,
            ],
            'case true' => [
                'context' => ['input' => ['class' => PersistTodoDTO::class]],
                'expected' => true,
            ],
        ];
    }

    /**
     * @dataProvider dataSupportsTransformation
     */
    public function testSupportsTransformation(array $context, bool $expected): void
    {
        $actual = $this->testedObject->supportsTransformation(new \stdClass(), 'to', $context);

        $this->assertEquals($expected, $actual);
    }

    public function testTransformAfterCreation(): void
    {
        $object = $this->initializeDto();
        $context = ['collection_operation_name' => 'todo'];

        $user = new User();
        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $this->validator
            ->expects($this->once())
            ->method('validate')
            ->with($object, ['groups' => 'create_todo']);

        $actual = $this->testedObject->transform($object, 'to', $context);

        $this->assertSame($actual->getUser(), $user);
        $this->assertSame($actual->getName(), 'name');
        $this->assertSame($actual->getDate()->format('Y-m-d'), '2022-01-01');
        $this->assertSame($actual->getReminder()->format('Y-m-d'), '2021-01-01');
        $this->assertSame($actual->getIsDone(), false);
        $this->assertSame($actual->getDescription(), 'description');
    }

    public function testTransformAfterModification(): void
    {
        $object = $this->initializeDto();
        $todo = new Todo();

        $context = ['object_to_populate' => $todo];

        $this->security
            ->expects($this->never())
            ->method('getUser');

        $this->validator
            ->expects($this->once())
            ->method('validate')
            ->with($object, ['groups' => 'update_todo']);

        $actual = $this->testedObject->transform($object, 'to', $context);

        $this->assertSame($actual->getName(), 'name');
        $this->assertSame($actual->getDate()->format('Y-m-d'), '2022-01-01');
        $this->assertSame($actual->getReminder()->format('Y-m-d'), '2021-01-01');
        $this->assertSame($actual->getIsDone(), false);
        $this->assertSame($actual->getDescription(), 'description');
    }

    private function initializeDto(): PersistTodoDTO
    {
        $object = new PersistTodoDTO();
        $object
            ->setName('name')
            ->setDate(new \DateTime('2022-01-01'))
            ->setDescription('description')
            ->setReminder(new \DateTime('2021-01-01'));

        return $object;
    }
}
