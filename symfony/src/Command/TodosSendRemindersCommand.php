<?php

namespace App\Command;

use App\Entity\User;
use App\Mailer\TodoReminderMailer;
use App\Repository\TodoRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\Exception\TransportException;

class TodosSendRemindersCommand extends Command
{
    protected static $defaultName = 'app:todos:send-reminders';
    protected static string $defaultDescription = 'Send todo reminder emails';

    private TodoRepository $todoRepository;

    private LoggerInterface $logger;

    private TodoReminderMailer $mailer;

    public function __construct(
        TodoRepository $todoRepository,
        TodoReminderMailer $mailer,
        LoggerInterface $logger
    ) {
        parent::__construct();
        $this->todoRepository = $todoRepository;
        $this->mailer = $mailer;
        $this->logger = $logger;
    }

    protected function configure(): void
    {
        $this->setDescription(self::$defaultDescription);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $dateReference = (new \DateTimeImmutable())->format('Ymd-Hi');
        $this->logger->notice(sprintf('[%s] - Start of the todo reminder command', $dateReference));

        $now = new \DateTimeImmutable();
        $fiveMinutesAgo = new \DateTimeImmutable('-5 minutes');

        $todos = $this->todoRepository->findNotDoneByReminderInterval($fiveMinutesAgo, $now);

        $countEmails = $countErrors = 0;

        foreach ($todos as $todo) {
            try {
                $this->mailer->send($todo);
                ++$countEmails;
            } catch (TransportException $exception) {
                /** @var User $user */
                $user = $todo->getUser();
                ++$countErrors;

                $this->logger->error(sprintf(
                    '[%s] - Could not send email for todo %s to user %s',
                    $dateReference,
                        $todo->getId(),
                        $user->getEmail(),
                    ),
                    ['message' => $exception->getMessage()]
                );
            }
        }

        $this->logger->notice(sprintf('[%s] - %s emails sent / %s errors', $dateReference, $countEmails, $countErrors));

        return Command::SUCCESS;
    }
}
