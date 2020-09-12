<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Todo;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TodoFixtures extends Fixture implements DependentFixtureInterface
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function load(ObjectManager $manager): void
    {
        $users = $this->userRepository->findAll();

        $faker = Factory::create();

        foreach ($users as $user) {
            for ($t = 0; $t < 5; ++$t) {
                $todo = new Todo();

                $todo
                    ->setName($faker->word)
                    ->setDescription($faker->sentence)
                    ->setDate($faker->dateTimeInInterval('-7 days', '+7 days'))
                    ->setUser($user)
                    ->setIsDone($faker->boolean)
                ;

                $manager->persist($todo);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
