<?php

declare(strict_types=1);

namespace App\Tests\Unit\Model\Account;

use App\Model\Account\UpdatePasswordDTO;
use PHPUnit\Framework\TestCase;

class UpdatePasswordDTOTest extends TestCase
{
    private UpdatePasswordDTO $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new UpdatePasswordDTO();
    }

    public function testGetCurrentPassword(): void
    {
        $previousPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setCurrentPassword($previousPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($previousPassword, $updatePasswordDTO->getCurrentPassword());
    }

    public function testGetNewPassword(): void
    {
        $newPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setNewPassword($newPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($newPassword, $updatePasswordDTO->getNewPassword());
    }

    public function testGetConfirmPassword(): void
    {
        $confirmedPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setConfirmPassword($confirmedPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($confirmedPassword, $updatePasswordDTO->getConfirmPassword());
    }

    public function dataIsConfirmedPasswordEqualToNewPassword(): array
    {
        return [
            'case true' => [
                'newPassword' => '123456',
                'confirmPassword' => '123456',
                'expected' => true,
            ],
            'case false' => [
                'newPassword' => '123456',
                'confirmPassword' => '1234567',
                'expected' => false,
            ],
        ];
    }

    /**
     * @dataProvider dataIsConfirmedPasswordEqualToNewPassword
     */
    public function testIsConfirmedPasswordEqualToNewPassword(
        string $newPassword,
        string $confirmPassword,
        bool $expected
    ): void {
        $this->testedObject
            ->setConfirmPassword($confirmPassword)
            ->setNewPassword($newPassword)
        ;

        $actual = $this->testedObject->isConfirmPasswordEqualToNewPassword();

        $this->assertEquals($expected, $actual);
    }
}
