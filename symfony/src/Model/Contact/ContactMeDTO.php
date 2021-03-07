<?php

declare(strict_types=1);

namespace App\Model\Contact;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Contact\ContactMeController;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "updatePassword"={
 *              "path"="contact-me",
 *              "controller"=ContactMeController::class,
 *              "input"=ContactMeDTO::class,
 *              "method"="POST",
 *              "openapi_context"={
 *                  "tags"={"Contact"},
 *                  "summary"="Sends me an email",
 *                  "responses"={
 *                      "200"={
 *                          "description"="Email successfully sent.",
 *                          "content"={
 *                              "application/json"={}
 *                          }
 *                      },
 *                      "400"={
 *                          "description"="Input data is not valid.",
 *                          "content"={
 *                              "application/json"={}
 *                          }
 *                      },
 *                      "502"={
 *                          "description"="Could not send email.",
 *                          "content"={
 *                              "application/json"={}
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *     }
 * )
 */
class ContactMeDTO
{
    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private string $email = '';

    /** @Assert\NotBlank() */
    private string $name = '';

    /** @Assert\NotBlank() */
    private string $subject = '';

    /** @Assert\NotBlank() */
    private string $message = '';

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }
}
