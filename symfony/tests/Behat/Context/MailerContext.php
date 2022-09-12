<?php

declare(strict_types=1);

namespace Tests\Behat\Context;

use Behat\Behat\Context\Context;
use Symfony\Component\Mime\Email;
use Webmozart\Assert\Assert;

final class MailerContext implements Context
{
    /** @var Email[] */
    private static array $emails;

    public static function addMEmail(Email $email): void
    {
        self::$emails[] = $email;
    }

    /** @BeforeScenario */
    public function reset(): void
    {
        self::$emails = [];
    }

    /**
     * @Then /^(\d+) emails? should have been sent$/
     */
    public function countEmailsShouldHaveBeenSent(int $count): void
    {
        Assert::count(self::$emails, $count);
    }

    /**
     * @Then the :index email sent should be from :from to :to with subject :subject
     */
    public function theStEmailShouldHave(int $index, string $to, string $from, string $subject): void
    {
        $email = self::$emails[$index - 1];

        Assert::same($email->getTo()[0]->getAddress(), $to);
        Assert::same($email->getFrom()[0]->getAddress(), $from);
        Assert::same($email->getSubject(), $subject);
    }

    /**
     * @Then the :index email sent body should contain :body
     */
    public function theStEmailBodyShouldContain(int $index, string $body): void
    {
        $email = self::$emails[$index - 1];

        Assert::contains((string) $email->getHtmlBody(), $body);
    }
}
