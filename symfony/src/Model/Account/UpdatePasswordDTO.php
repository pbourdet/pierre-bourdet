<?php

declare(strict_types=1);

namespace App\Model\Account;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\UpdatePasswordController;
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
 *                          "description"="Password successfully updated."
 *                      },
 *                      "400"={
 *                          "description"="Input data is not valid."
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
    private string $previousPassword;

    /**
     * @Assert\Length(min="4")
     */
    private string $newPassword;

    private string $confirmedPassword;

    public function getPreviousPassword(): string
    {
        return $this->previousPassword;
    }

    public function setPreviousPassword(string $previousPassword): UpdatePasswordDTO
    {
        $this->previousPassword = $previousPassword;

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

    public function getConfirmedPassword(): string
    {
        return $this->confirmedPassword;
    }

    public function setConfirmedPassword(string $confirmedPassword): UpdatePasswordDTO
    {
        $this->confirmedPassword = $confirmedPassword;

        return $this;
    }

    /**
     * @Assert\IsTrue()
     */
    public function isConfirmedPasswordEqualToNewPassword(): bool
    {
        return $this->newPassword === $this->confirmedPassword;
    }
}
