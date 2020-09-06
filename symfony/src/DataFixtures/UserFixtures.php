<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    public const DEFAULT_EMAIL = 'test@test.fr';
    public const DEFAULT_PASSWORD = '123456';

    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $defaultUser = new User();
        $password = $this->encoder->encodePassword($defaultUser, self::DEFAULT_PASSWORD);

        $defaultUser
            ->setPassword($password)
            ->setEmail(self::DEFAULT_EMAIL)
        ;

        $manager->persist($defaultUser);

        $faker = Factory::create();

        for ($u = 0; $u < 10; ++$u) {
            $user = new User();

            $password = $this->encoder->encodePassword($user, self::DEFAULT_PASSWORD);

            $user
                ->setEmail($faker->email)
                ->setPassword($password)
            ;

            $manager->persist($user);
        }

        $manager->flush();
    }
}
