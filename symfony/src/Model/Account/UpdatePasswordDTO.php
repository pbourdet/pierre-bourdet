<?php

declare(strict_types=1);

namespace App\Model\Account;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Account\UpdatePasswordController;
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "updatePassword"={
 *              "path"="account/update-password",
 *              "controller"=UpdatePasswordController::class,
 *              "input"=UpdatePasswordDTO::class,
 *              "output"=false,
 *              "method"="POST",
 *              "openapi_context"={
 *                  "tags"={"Account"},
 *                  "summary"="A user can update his password.",
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
 *                      }
 *                  }
 *              }
 *          }
 *     }
 * )
 */
class UpdatePasswordDTO
{
    /**
     * @SecurityAssert\UserPassword()
     */
    private string $currentPassword;

    /**
     * @Assert\Length(min="4")
     */
    private string $newPassword;

    private string $confirmPassword;

    public function getCurrentPassword(): string
    {
        return $this->currentPassword;
    }

    public function setCurrentPassword(string $currentPassword): UpdatePasswordDTO
    {
        $this->currentPassword = $currentPassword;

        return $this;
    }

    public function getNewPassword(): string
    {
        return $this->newPassword;
    }

    public function setNewPassword(string $newPassword): UpdatePasswordDTO
    {
        $this->newPassword = $newPassword;

        return $this;
    }

    public function getConfirmPassword(): string
    {
        return $this->confirmPassword;
    }

    public function setConfirmPassword(string $confirmPassword): UpdatePasswordDTO
    {
        $this->confirmPassword = $confirmPassword;

        return $this;
    }

    /**
     * @Assert\IsTrue()
     */
    public function isConfirmPasswordEqualToNewPassword(): bool
    {
        return $this->newPassword === $this->confirmPassword;
    }
}
