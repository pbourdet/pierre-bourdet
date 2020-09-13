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

    public function testGetPreviousPassword(): void
    {
        $previousPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setPreviousPassword($previousPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($previousPassword, $updatePasswordDTO->getPreviousPassword());
    }

    public function testGetNewPassword(): void
    {
        $newPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setNewPassword($newPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($newPassword, $updatePasswordDTO->getNewPassword());
    }

    public function testGetConfirmedPassword(): void
    {
        $confirmedPassword = 'zbreh';

        $updatePasswordDTO = $this->testedObject->setConfirmedPassword($confirmedPassword);

        $this->assertInstanceOf(UpdatePasswordDTO::class, $updatePasswordDTO);
        $this->assertEquals($confirmedPassword, $updatePasswordDTO->getConfirmedPassword());
    }

    public function dataIsConfirmedPasswordEqualToNewPassword(): array
    {
        return [
            'case true' => [
                'newPassword' => '123456',
                'confirmedPassword' => '123456',
                'expected' => true,
            ],
            'case false' => [
                'newPassword' => '123456',
                'confirmedPassword' => '1234567',
                'expected' => false,
            ],
        ];
    }

    /**
     * @dataProvider dataIsConfirmedPasswordEqualToNewPassword
     */
    public function testIsConfirmedPasswordEqualToNewPassword(
        string $newPassword,
        string $confirmedPassword,
        bool $expected
    ): void {
        $this->testedObject
            ->setConfirmedPassword($confirmedPassword)
            ->setNewPassword($newPassword)
        ;

        $actual = $this->testedObject->isConfirmedPasswordEqualToNewPassword();

        $this->assertEquals($expected, $actual);
    }
}
