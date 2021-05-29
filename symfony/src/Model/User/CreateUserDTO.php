<?php

declare(strict_types=1);

namespace App\Model\User;

use Symfony\Component\Validator\Constraints as Assert;

final class CreateUserDTO
{
    /**
     * @Assert\Email()
     * @Assert\NotBlank()
     */
    private string $email;

    /**
     * @Assert\Regex("/^[a-zA-Z0-9]{3,}$/")
     * @Assert\NotBlank()
     */
    private string $nickname;

    /**
     * @Assert\Length(min = 4)
     * @Assert\Regex("/\d/")
     * @Assert\NotBlank()
     */
    private string $password;

    /**
     * @Assert\Choice(callback={"App\Model\Enum\LanguageEnum", "getIsoLanguages"})
     */
    private string $language;

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getNickname(): string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getLanguage(): string
    {
        return $this->language;
    }

    public function setLanguage(string $language): void
    {
        $this->language = $language;
    }
}
