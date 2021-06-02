<?php

declare(strict_types=1);

namespace App\Controller\Contact;

use App\Mailer\EmailFactory;
use App\Message\EmailMessage;
use App\Model\Contact\ContactMeDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactMeController extends AbstractController
{
    public function __construct(
        private ValidatorInterface $validator,
        private MessageBusInterface $bus,
        private EmailFactory $emailFactory
    ) {
    }

    public function __invoke(ContactMeDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $email = $this->emailFactory->createForContactMe($data);
        $this->bus->dispatch(new EmailMessage($email));

        return $this->json(null, Response::HTTP_ACCEPTED);
    }
}
