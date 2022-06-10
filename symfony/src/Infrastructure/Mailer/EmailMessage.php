<?php

declare(strict_types=1);

namespace Infrastructure\Mailer;

use Symfony\Component\Mime\Email;

class EmailMessage
{
    public function __construct(
        private readonly Email $email,
        private readonly ?string $locale = null
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
