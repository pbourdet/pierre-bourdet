<?php

declare(strict_types=1);

namespace App\Model\Security;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Security\ResetPasswordController;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "resetPassword"={
 *              "path"="/security/reset-password",
 *              "controller"=ResetPasswordController::class,
 *              "input"=ResetPasswordDTO::class,
 *              "output"=false,
 *              "method"="POST",
 *              "openapi_context"={
 *                  "tags"={"Security"},
 *                  "summary"="Reset the user's password.",
 *                  "responses"={
 *                      "200"={
 *                          "description"="Password successfully updated.",
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
 *                      "401"={
 *                          "description"="Invalid reset token.",
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
class ResetPasswordDTO
{
    public string $token = '';

    #[
        Assert\Length(min: 4),
        Assert\Regex(pattern: '/\d/')
    ]
    public string $password = '';

    #[Assert\EqualTo(propertyPath: 'password')]
    public string $confirmPassword = '';
}
