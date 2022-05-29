<?php

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Mailer;

use Infrastructure\Mailer\EmailMessage;
use Infrastructure\Mailer\EmailMessageHandler;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Translation\Translator;
use Symfony\Contracts\Translation\TranslatorInterface;

class EmailMessageHandlerTest extends TestCase
{
    private MockObject|MailerInterface $mailer;

    private MockObject|TranslatorInterface $translator;

    private MockObject|LoggerInterface $logger;

    private EmailMessageHandler $testedObject;

    protected function setUp(): void
    {
        $this->mailer = $this->createMock(MailerInterface::class);
        $this->translator = $this->createMock(Translator::class);
        $this->logger = $this->createMock(LoggerInterface::class);

        $this->testedObject = new EmailMessageHandler(
            $this->mailer,
            $this->translator,
            $this->logger
        );
    }

    public function testInvoke(): void
    {
        $email = new Email();
        $locale = 'fr-FR';
        $emailMessage = new EmailMessage($email, $locale);

        $this->translator
            ->expects($this->once())
            ->method('setLocale')
            ->with($locale)
        ;

        $this->mailer
            ->expects($this->once())
            ->method('send')
            ->with($email)
        ;

        $this->testedObject->__invoke($emailMessage);
    }

    public function testInvokeWithException(): void
    {
        $email = new Email();
        $locale = 'fr-FR';
        $emailMessage = new EmailMessage($email, $locale);
        $email->addTo('test@test.fr');

        $this->translator
            ->expects($this->once())
            ->method('setLocale')
            ->with($locale)
        ;

        $this->mailer
            ->expects($this->once())
            ->method('send')
            ->willThrowException(new TransportException('error'))
        ;

        $this->logger
            ->expects($this->once())
            ->method('error')
            ->with('Could not send email to test@test.fr', ['message' => 'error']);

        $this->testedObject->__invoke($emailMessage);
    }
}
