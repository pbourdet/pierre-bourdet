<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Messaging\DataTransformer;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Conversation;
use App\Entity\User;
use App\Repository\UserRepository;
use Domain\Messaging\DataTransformer\CreateConversationDataTransformer;
use Model\Messaging\CreateConversationDTO;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Uid\Uuid;

class CreateConversationDataTransformerTest extends TestCase
{
    private MockObject|Security $security;

    private MockObject|ValidatorInterface $validator;

    private MockObject|UserRepository $userRepository;

    private CreateConversationDataTransformer $testedObject;

    protected function setUp(): void
    {
        $this->security = $this->createMock(Security::class);
        $this->validator = $this->createMock(ValidatorInterface::class);
        $this->userRepository = $this->createMock(UserRepository::class);

        $this->testedObject = new CreateConversationDataTransformer(
            $this->security,
            $this->validator,
            $this->userRepository
        );
    }

    public function testTransform(): void
    {
        $userId = (string) Uuid::v4();
        $object = new CreateConversationDTO();
        $object->setUserId($userId);

        $this->validator->expects($this->once())->method('validate');

        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn(new User());
        $this->userRepository
            ->expects($this->once())
            ->method('find')
            ->with($userId)
            ->willReturn(new User());

        $actual = $this->testedObject->transform($object, '', []);

        $this->assertInstanceOf(Conversation::class, $actual);
    }

    /** @dataProvider dataTestSupportsTransformation */
    public function testSupportsTransformation($data, string $to, array $context, bool $expected): void
    {
        $actual = $this->testedObject->supportsTransformation($data, $to, $context);

        $this->assertSame($actual, $expected);
    }

    public function dataTestSupportsTransformation(): array
    {
        return [
            'case true' => [
                'data' => new CreateConversationDTO(),
                'to' => Conversation::class,
                'context' => ['input' => ['class' => 'class']],
                'expected' => true,
            ],
            'case false data' => [
                'data' => new Conversation(),
                'to' => Conversation::class,
                'context' => ['input' => ['class' => 'class']],
                'expected' => false,
            ],
            'case case false to' => [
                'data' => new CreateConversationDTO(),
                'to' => User::class,
                'context' => ['input' => ['class' => 'class']],
                'expected' => false,
            ],
            'case false context' => [
                'data' => new CreateConversationDTO(),
                'to' => Conversation::class,
                'context' => [],
                'expected' => false,
            ],
        ];
    }
}
