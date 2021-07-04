<?php

namespace Tests\Unit\Infrastructure\Serializer\NameConverter;

use Infrastructure\Serializer\NameConverter\CamelCaseNameConverter;
use PHPUnit\Framework\TestCase;

class CamelCaseNameConverterTest extends TestCase
{
    private CamelCaseNameConverter $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new CamelCaseNameConverter();
    }

    /** @dataProvider dataProvider */
    public function testNormalize(string $propertyName, string $expected): void
    {
        $actual = $this->testedObject->normalize($propertyName);

        $this->assertEquals($expected, $actual);
    }

    /** @dataProvider dataProvider */
    public function testDenormalize(string $propertyName, string $expected): void
    {
        $actual = $this->testedObject->denormalize($propertyName);

        $this->assertEquals($expected, $actual);
    }

    public function dataProvider(): array
    {
        return [
            'case snake' => [
                'propertyName' => 'camel_case',
                'expected' => 'camelCase',
            ],
            'case camel' => [
                'propertyName' => 'camelCase',
                'expected' => 'camelCase',
            ],
            'case default' => [
                'propertyName' => 'camelcase',
                'expected' => 'camelcase',
            ],
        ];
    }
}
