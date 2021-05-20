<?php

declare(strict_types=1);

namespace App\Controller\Contact;

use App\Mailer\ContactMeMailer;
use App\Model\Contact\ContactMeDTO;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactMeController extends AbstractController
{
    private ValidatorInterface $validator;

    private ContactMeMailer $contactMailer;

    private LoggerInterface $logger;

    public function __construct(
        ValidatorInterface $validator,
        ContactMeMailer $contactMailer,
        LoggerInterface $logger
    ) {
        $this->validator = $validator;
        $this->contactMailer = $contactMailer;
        $this->logger = $logger;
    }

    public function __invoke(ContactMeDTO $data): JsonResponse
    {
        if (count($errors = $this->validator->validate($data)) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->contactMailer->sendContactEmail($data);
        } catch (TransportException $exception) {
            $this->logger->alert($exception->getMessage(), [
                'dto' => $data,
            ]);

            return $this->json('Could not send email', Response::HTTP_BAD_GATEWAY);
        }

        return $this->json(null);
    }
}
