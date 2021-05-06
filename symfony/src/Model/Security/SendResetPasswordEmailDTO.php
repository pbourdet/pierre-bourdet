<?php

declare(strict_types=1);

namespace App\Model\Security;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Security\SendResetPasswordEmailController;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "resetPasswordEmail"={
 *              "path"="/security/reset-password-email",
 *              "controller"=SendResetPasswordEmailController::class,
 *              "input"=SendResetPasswordEmailDTO::class,
 *              "output"=false,
 *              "method"="POST",
 *              "openapi_context"={
 *                  "tags"={"Security"},
 *                  "summary"="Send a reset password email to the user.",
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
 *                      }
 *                  }
 *              }
 *          }
 *     }
 * )
 */
class SendResetPasswordEmailDTO
{
    /** @Assert\Email() */
    public string $email = '';
}
