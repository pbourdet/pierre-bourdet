<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\SnakeGame;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

class SnakeGameFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        private UserRepository $userRepository
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $manager->getConnection()->getConfiguration()->setSQLLogger();

        $users = $this->userRepository->findAll();

        $faker = Factory::create();

        foreach ($users as $user) {
            for ($g = 0; $g < 5; ++$g) {
                $snakeGame = new SnakeGame();

                $snakeGame
                    ->setId(Uuid::v4())
                    ->setScore($faker->numberBetween(int2: 1000))
                    ->setUser($user);

                $manager->persist($snakeGame);
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
