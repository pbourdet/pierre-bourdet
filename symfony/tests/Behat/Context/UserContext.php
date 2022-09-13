<?php

declare(strict_types=1);

namespace Tests\Behat\Context;

use App\Entity\User;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Model\Account\Enum\LanguageEnum;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

final class UserContext implements Context
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly PasswordHasherInterface $kernel,
    ) {
    }

    /**
     * @Then there is following user:
     */
    public function thereIsFollowingUser(TableNode $table): void
    {
        $hash = $table->getRowsHash();
        $faker = Factory::create();

        $user = new User();
        $user
            ->setEmail($hash['email'] ?? $faker->email)
            ->setPassword($hash['password'] ?? $faker->password)
            ->setLanguage($hash['language'] ?? LanguageEnum::EN_ISO639)
            ->setNickname($hash['nickname'] ?? $faker->userName)
            ->setId($hash['id'] ?? Uuid::v4());

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
