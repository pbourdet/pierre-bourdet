<?php

namespace App\Command;

use App\Mailer\EmailFactory;
use App\Message\EmailMessage;
use App\Repository\TodoRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class TodosSendRemindersCommand extends Command
{
    protected static $defaultName = 'app:todos:send-reminders';
    protected static string $defaultDescription = 'Send todo reminder emails';

    private TodoRepository $todoRepository;

    private LoggerInterface $logger;

    private MessageBusInterface $bus;

    private EmailFactory $emailFactory;

    public function __construct(
        TodoRepository $todoRepository,
        MessageBusInterface $bus,
        LoggerInterface $logger,
        EmailFactory $emailFactory
    ) {
        parent::__construct();
        $this->todoRepository = $todoRepository;
        $this->bus = $bus;
        $this->logger = $logger;
        $this->emailFactory = $emailFactory;
    }

    protected function configure(): void
    {
        $this->setDescription(self::$defaultDescription);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $dateReference = (new \DateTimeImmutable())->format('Ymd-Hi');
        $this->logger->notice(sprintf('[%s] - Start of the todo reminder command', $dateReference));

        $now = (new \DateTime('UTC'));
        $now->setTime((int) $now->format('H'), (int) $now->format('i'));
        $todos = $this->todoRepository->findNotDoneByReminder($now);

        foreach ($todos as $todo) {
            $email = $this->emailFactory->createForTodoReminder($todo);

            $this->bus->dispatch(new EmailMessage($email));
        }

        $this->logger->notice(sprintf('[%s] - %s emails sent', $dateReference, count($todos)));

        return Command::SUCCESS;
    }
}
