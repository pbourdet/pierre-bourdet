<?php

declare(strict_types=1);

namespace App\Message;

use Symfony\Component\Mime\Email;

class EmailMessage
{
    private Email $email;

    private ?string $locale;

    public function __construct(Email $email, string $locale = null)
    {
        $this->email = $email;
        $this->locale = $locale;
    }

    public function getEmail(): Email
    {
        return $this->email;
    }

    public function getLocale(): ?string
    {
        return $this->locale;
    }
}
