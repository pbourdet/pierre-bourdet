<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

class UserFixtures extends Fixture
{
    public const DEFAULT_EMAIL = 'test@test.fr';
    public const DEFAULT_PASSWORD = '123456';
    public const DEFAULT_NICKNAME = 'pierre';
    public const DEFAULT_UUID = '20354d7a-e4fe-47af-8ff6-187bca92f3f9';
    public const USER_WITH_NO_CONVERSATION = 'c138ab77-11d0-45a4-b2b1-f826875efb0e';

    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $manager->getConnection()->getConfiguration()->setSQLLogger();

        $defaultUser = new User();
        $password = $this->hasher->hashPassword($defaultUser, self::DEFAULT_PASSWORD);
        $languages = ['fr', 'en'];

        $defaultUser
            ->setPassword($password)
            ->setEmail(self::DEFAULT_EMAIL)
            ->setNickname(self::DEFAULT_NICKNAME)
            ->setLanguage('en')
            ->setId(Uuid::fromString(self::DEFAULT_UUID))
        ;

        $manager->persist($defaultUser);

        $faker = Factory::create();

        for ($u = 0; $u < 10; ++$u) {
            $user = new User();

            if (9 === $u) {
                $user->setId(Uuid::fromString(self::USER_WITH_NO_CONVERSATION));
            }

            $password = $this->hasher->hashPassword($user, self::DEFAULT_PASSWORD);

            $user
                ->setEmail($faker->email())
                ->setPassword($password)
                ->setNickname($faker->firstName())
                ->setLanguage($languages[array_rand($languages)])
            ;

            $manager->persist($user);
        }

        $manager->flush();
    }
}
