<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public const DEFAULT_EMAIL = 'test@test.fr';
    public const DEFAULT_PASSWORD = '123456';
    public const DEFAULT_NICKNAME = 'pierre';

    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $defaultUser = new User();
        $password = $this->hasher->hashPassword($defaultUser, self::DEFAULT_PASSWORD);
        $languages = ['fr', 'en'];

        $defaultUser
            ->setPassword($password)
            ->setEmail(self::DEFAULT_EMAIL)
            ->setNickname(self::DEFAULT_NICKNAME)
            ->setLanguage('en')
        ;

        $manager->persist($defaultUser);

        $faker = Factory::create();

        for ($u = 0; $u < 10; ++$u) {
            $user = new User();

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
