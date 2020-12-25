<?php

declare(strict_types=1);

namespace App\Model\Chat;

class WhatsappMessage
{
    public \DateTime $dateTime;
    public string $sender;
    public string $content;

    public function __construct($dateTime, $sender, $content)
    {
        $this->sender = $sender;
        $this->content = $content;
        $this->dateTime = \DateTime::createFromFormat('d/m/Y à H:i', $dateTime);
    }
}
