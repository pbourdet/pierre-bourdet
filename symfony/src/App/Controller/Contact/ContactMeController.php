<?php

declare(strict_types=1);

namespace App\Controller\Contact;

use Infrastructure\Mailer\EmailFactory;
use Infrastructure\Mailer\EmailMessage;
use Model\Contact\ContactMeDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactMeController extends AbstractController
{
    final public const PATH = '/public/contact-me';

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly MessageBusInterface $bus,
        private readonly EmailFactory $emailFactory
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
