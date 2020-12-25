<?php

namespace App\Command;

use App\Model\Chat\WhatsappMessage;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class AnalyseChatCommand extends Command
{
    protected static $defaultName = 'analyse:chat';

    private const MESSAGE_HEADER_REGEX = '/^(0[1-9]|[1|2][0-9]|3[0|1])\/(0[1-9]|1[0-2])\/20([1][8|9]|[2][0|1]) à (0[1-9]|1[1-9]|2[0-3]):([0-5][0-9]) - (Pi|Ad)/';

    private ?string $nickname = null;
    private array $messagesPerDay = [];
    private array $messagesPerSender = [];
    private array $messagesPerTime = [];
    private array $messagesPerWeek = [];
    private array $messagesPerMonth = [];
    private array $messagesPerYear = [];
    private array $nicknameCount = [];
    private array $dailyFirstSender = [];

    protected function configure()
    {
        $this
            ->setDescription('Analyse Whatspp chat')
            ->addArgument('nickname', InputArgument::OPTIONAL, 'Nickname to search')
        ;

    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $this->nickname = $input->getArgument('nickname');

        $file = file_get_contents(dirname(__DIR__, 2).'/assets/whatsapp-chat.txt');
        $rows = explode("\n", $file);

        $currentLine = '';
        foreach ($rows as $row) {
            if (!preg_match(self::MESSAGE_HEADER_REGEX, $row)) {
                $currentLine .= $row;

                continue;
            }

            if ('' !== $currentLine) {
                $message = $this->createMessage($currentLine);
                $this->analyseMessage($message);
            }

            $currentLine = $row;
        }

        $io->success('File analyzed !');

        return 0;
    }

    private function createMessage(string $message): WhatsappMessage
    {
        $dateTime = substr($message, 0, 19);
        $message = substr($message, 22);
        $sender = substr($message, 0, strpos($message, ':'));
        $content  = substr($message, strpos($message, ':')+2);

        return new WhatsAppMessage($dateTime, $sender, $content);
    }

    private function analyseMessage(WhatsappMessage $message): void
    {
        $this->countMessagesPerDay($message);
        $this->countMessagesPerWeek($message);
        $this->countMessagesPerMonth($message);
        $this->countMessagesPerYear($message);
        $this->countMessagesPerSender($message);
        $this->countMessagesPerTime($message);
        $this->computeFirstSender($message);

        if (null !== $this->nickname) {
            $this->nicknameCount($message);
        }
    }

    private function computeFirstSender(WhatsappMessage $message): void
    {
        $day = $message->dateTime->format('d/m/Y');

        if (array_key_exists($day, $this->dailyFirstSender)) {
            return;
        }

        if ($message->dateTime->format('H:i') >= '07:00'){
            $this->dailyFirstSender[$day] = $message->sender;
        }
    }

    private function countMessagesPerDay(WhatsappMessage $message): void
    {
        $this->countMessage($message->dateTime->format('d/m/Y'), $this->messagesPerDay);
    }

    private function countMessagesPerWeek(WhatsappMessage $message): void
    {
        $this->countMessage($message->dateTime->format('W/Y'), $this->messagesPerWeek);
    }

    private function countMessagesPerMonth(WhatsappMessage $message)
    {
        $this->countMessage($message->dateTime->format('m/Y'), $this->messagesPerMonth);
    }

    private function countMessagesPerYear(WhatsappMessage $message)
    {
        $this->countMessage($message->dateTime->format('Y'), $this->messagesPerYear);
    }

    private function countMessagesPerTime(WhatsappMessage $message)
    {
        $this->countMessage($message->dateTime->format('H:i'), $this->messagesPerTime);
    }

    private function countMessagesPerSender(WhatsappMessage $message)
    {
        $this->countMessage($message->sender, $this->messagesPerSender);
    }

    private function nicknameCount(WhatsappMessage $message): void
    {
        $this->countMessage(
            $message->sender,
            $this->nicknameCount,
            substr_count(strtolower($message->content), $this->nickname)
        );
    }

    private function countMessage(string $arrayKey, array &$array, int $add = 1): void
    {
        if (!array_key_exists($arrayKey, $array)) {
            $array[$arrayKey] = $add;
        } else {
            $array[$arrayKey] += $add;
        }
    }
}
