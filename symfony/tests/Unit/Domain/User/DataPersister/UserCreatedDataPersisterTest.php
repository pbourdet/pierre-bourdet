<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\User\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use Domain\User\DataPersister\UserCreatedDataPersister;
use Infrastructure\Mailer\EmailFactory;
use Infrastructure\Mailer\EmailMessage;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserCreatedDataPersisterTest extends TestCase
{
    private MockObject|EmailFactory $emailFactory;

    private MockObject|MessageBusInterface $bus;

    private MockObject|ContextAwareDataPersisterInterface $decorator;

    private MockObject|TranslatorInterface $translator;

    private UserCreatedDataPersister $testedObject;

    protected function setUp(): void
    {
        $this->emailFactory = $this->createMock(EmailFactory::class);
        $this->bus = $this->createMock(MessageBusInterface::class);
        $this->decorator = $this->createMock(ContextAwareDataPersisterInterface::class);
        $this->translator = $this->createMock(TranslatorInterface::class);

        $this->testedObject = new UserCreatedDataPersister(
            $this->emailFactory,
            $this->bus,
            $this->decorator,
            $this->translator
        );
    }

    public function dataSupports(): array
    {
        return [
            'case false' => [
                'expected' => false,
            ],
            'case true' => [
                'expected' => true,
            ],
        ];
    }

    /** @dataProvider dataSupports */
    public function testSupports(bool $expected): void
    {
        $data = [];

        $this->decorator
            ->expects($this->once())
            ->method('supports')
            ->with($data)
            ->willReturn($expected);

        $this->assertSame($expected, $this->testedObject->supports($data));
    }

    public function testPersist(): void
    {
        $locale = 'en';
        $data = new User();
        $email = new TemplatedEmail();
        $message = new EmailMessage($email, $locale);
        $envelope = new Envelope($message);
        $data->setLanguage($locale);
        $context['collection_operation_name'] = 'post';

        $this->decorator
            ->expects($this->once())
            ->method('persist')
            ->with($data, $context)
            ->willReturn($data);

        $this->translator
            ->expects($this->once())
            ->method('trans')
            ->with('subject', [], 'user-subscription-email')
            ->willReturn('subject');

        $this->emailFactory
            ->expects($this->once())
            ->method('createForUserSubscription')
            ->with($data, 'subject')
            ->willReturn($email);

        $this->bus
            ->expects($this->once())
            ->method('dispatch')
            ->with($message)
            ->willReturn($envelope);

        $actual = $this->testedObject->persist($data, $context);

        $this->assertSame($data, $actual);
    }

    /** @dataProvider dataUnsupportedPersist */
    public function testUnsupportedPersist(object $data, array $context): void
    {
        $this->decorator
            ->expects($this->once())
            ->method('persist')
            ->with($data, $context)
            ->willReturn($data);

        $this->bus
            ->expects($this->never())
            ->method('dispatch');

        $actual = $this->testedObject->persist($data, $context);

        $this->assertSame($data, $actual);
    }

    public function dataUnsupportedPersist(): array
    {
        return [
            'case random data' => [
                'user' => new \stdClass(),
                'context' => ['collection_operation_name' => 'post'],
            ],
            'case wrong context' => [
                'user' => new User(),
                'context' => ['collection_operation_name' => 'get'],
            ],
        ];
    }

    public function testRemove(): void
    {
        $data = new \stdClass();
        $context = [];

        $this->decorator
            ->expects($this->once())
            ->method('remove')
            ->with($data, $context)
            ->willReturn($data);

        $this->testedObject->remove($data, $context);
    }
}
