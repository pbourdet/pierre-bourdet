<?php

declare(strict_types=1);

namespace App\Controller\Contact;

use App\Message\EmailMessage;
use App\Model\Contact\ContactMeDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactMeController extends AbstractController
{
    private ValidatorInterface $validator;

    private MessageBusInterface $bus;

    private string $personalEmail;

    public function __construct(
        ValidatorInterface $validator,
        MessageBusInterface $bus,
        string $personalEmail
    ) {
        $this->validator = $validator;
        $this->bus = $bus;
        $this->personalEmail = $personalEmail;
    }

    public function __invoke(ContactMeDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $email = (new Email())
            ->to($this->personalEmail)
            ->from(new Address($data->getEmail(), $data->getName()))
            ->subject($data->getSubject())
            ->text($data->getMessage())
        ;

        $this->bus->dispatch(new EmailMessage($email));

        return $this->json(null, Response::HTTP_ACCEPTED);
    }
}
