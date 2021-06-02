<?php

declare(strict_types=1);

namespace App\Message;

use Symfony\Component\Mime\Email;

class EmailMessage
{
    public function __construct(
        private Email $email,
        private ?string $locale = null
    ) {
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
