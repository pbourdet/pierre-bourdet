<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($u = 0; $u < 10; ++$u) {
            $user = new User();

            $password = $this->encoder->encodePassword($user, '123456');

            $user
                ->setEmail($faker->email)
                ->setPassword($password)
            ;

            $manager->persist($user);
        }

        $manager->flush();
    }
}
