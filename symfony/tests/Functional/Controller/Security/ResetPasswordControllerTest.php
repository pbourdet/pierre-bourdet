<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller\Security;

use App\DataFixtures\UserFixtures;
use App\Repository\UserRepository;
use App\Tests\Functional\AbstractEndPoint;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Uid\Uuid;

class ResetPasswordControllerTest extends AbstractEndPoint
{
    private const RESET_PASSWORD_URI = '/security/reset-password';

    private UserRepository $userRepository;

    private EntityManagerInterface $em;

    protected function setUp(): void
    {
        self::bootKernel();
        $container = self::$container;
        $this->userRepository = $container->get(UserRepository::class);
        $this->em = $container->get(EntityManagerInterface::class);
        self::ensureKernelShutdown();
    }

    public function testResetPassword(): void
    {
        $token = Uuid::v4()->toRfc4122();

        $this->setResetPasswordData($token, new \DateTimeImmutable('+1 hour'));

        $payload = sprintf(
            '{"token":"%s","password":"%s","confirmPassword":"%s"}',
            $token,
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::RESET_PASSWORD_URI,
            $payload,
            [],
            false,
            ''
        );

        $user = $this->userRepository->findOneBy([
            'email' => UserFixtures::DEFAULT_EMAIL,
        ]);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertNull($user->getResetPasswordExpirationDate());
        $this->assertNull($user->getResetPasswordToken());
    }

    public function testResetPasswordWithWrongToken(): void
    {
        $payload = sprintf(
            '{"token":"%s","password":"%s","confirmPassword":"%s"}',
            'wrong token',
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::RESET_PASSWORD_URI,
            $payload,
            [],
            false,
            ''
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testResetPasswordWithExpiredToken(): void
    {
        $token = Uuid::v4()->toRfc4122();
        $this->setResetPasswordData($token, new \DateTimeImmutable('-1 hour'));

        $payload = sprintf(
            '{"token":"%s","password":"%s","confirmPassword":"%s"}',
            $token,
            UserFixtures::DEFAULT_PASSWORD,
            UserFixtures::DEFAULT_PASSWORD
        );

        $response = $this->getResponseFromRequest(
            Request::METHOD_POST,
            self::RESET_PASSWORD_URI,
            $payload,
            [],
            false,
            ''
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    private function setResetPasswordData(string $token, \DateTimeImmutable $expirationDate): void
    {
        $user = $this->userRepository->findOneBy([
            'email' => UserFixtures::DEFAULT_EMAIL,
        ]);

        $user->setResetPasswordToken($token);
        $user->setResetPasswordExpirationDate($expirationDate);

        $this->em->persist($user);
        $this->em->flush();
        $this->em->clear();
    }
}
