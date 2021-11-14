<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Conversation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ConversationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($c = 0; $c < 10; ++$c) {
            $conversation = new Conversation();

            $manager->persist($conversation);
        }

        $manager->flush();
    }
}
