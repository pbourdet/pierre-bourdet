<?php

declare(strict_types=1);

namespace App\Model\Account;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Account\UpdateLanguageController;
use App\Model\Enum\LanguageEnum;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "updateLanguage"={
 *              "path"="/account/update-language",
 *              "controller"=UpdateLanguageController::class,
 *              "input"=UpdateLanguageDTO::class,
 *              "output"=false,
 *              "method"="POST",
 *              "openapi_context"={
 *                  "tags"={"Account"},
 *                  "summary"="A user can update his language.",
 *                  "responses"={
 *                      "200"={
 *                          "description"="Language successfully updated.",
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
class UpdateLanguageDTO
{
    #[Assert\Choice(callback: [LanguageEnum::class, 'getIsoLanguages'])]
    public string $language;
}
