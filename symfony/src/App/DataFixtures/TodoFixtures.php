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
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $manager->getConnection()->getConfiguration()->setSQLLogger();

        $users = $this->userRepository->findAll();

        $faker = Factory::create();

        foreach ($users as $user) {
            for ($t = 0; $t < 5; ++$t) {
                $todo = new Todo();

                $dateTime = $faker->dateTimeInInterval('-7 days', '+14 days');
                $dateTime->setTimestamp((int) (300 * ceil($dateTime->getTimestamp() / 300)));
                $reminder = clone $dateTime;
                $reminder = $t % 2
                    ? $reminder->sub(new \DateInterval('PT2H'))
                    : null;

                $todo
                    ->setName($faker->word())
                    ->setDescription($faker->sentence())
                    ->setDate($dateTime)
                    ->setUser($user)
                    ->setIsDone($faker->boolean())
                    ->setReminder($reminder)
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
