<?php

declare(strict_types=1);

namespace App\Model\Contact;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Contact\ContactMeController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    collectionOperations: [
        'contactMe' => [
            'path' => ContactMeController::PATH,
            'controller' => ContactMeController::class,
            'input' => ContactMeDTO::class,
            'output' => false,
            'method' => Request::METHOD_POST,
            'openapi_context' => [
                'tags' => ['Contact'],
                'summary' => 'Sends me an email',
                'description' => 'Sends me an email',
                'security' => [],
                'responses' => [
                    Response::HTTP_OK => [
                        'description' => 'Email successfully sent.',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                    Response::HTTP_BAD_REQUEST => [
                        'description' => 'Input data is not valid.',
                        'content' => [
                            'application/json' => [],
                        ],
                    ],
                ],
            ],
        ],
    ],
    itemOperations: [],
    formats: ['json']
)]
class ContactMeDTO
{
    #[
        Assert\Email,
        Assert\NotBlank
    ]
    private string $email = '';

    #[Assert\NotBlank]
    private string $name = '';

    #[Assert\NotBlank]
    private string $subject = '';

    #[Assert\NotBlank]
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
