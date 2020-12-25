<?php

declare(strict_types=1);

namespace App\Tests\Unit\Normalizer;

use App\Normalizer\TimestampNormalizer;
use PHPUnit\Framework\TestCase;

class TimestampNormalizerTest extends TestCase
{
    private TimestampNormalizer $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new TimestampNormalizer();
    }

    public function dataSupportsNormalization(): array
    {
        return [
            'case true' => [
                'data' => new \DateTime(),
                'expected' => true,
            ],
            'case false' => [
                'data' => 'string',
                'expected' => false,
            ],
        ];
    }

    /**
     * @dataProvider dataSupportsNormalization
     */
    public function testSupportsNormalization($data, bool $expected): void
    {
        $actual = $this->testedObject->supportsNormalization($data);

        $this->assertEquals($actual, $expected);
    }

    public function testNormalize(): void
    {
        $object = new \DateTime();
        $expected = $object->getTimestamp() * 1000;

        $actual = $this->testedObject->normalize($object, null, []);

        $this->assertEquals($expected, $actual);
    }

    public function dataSupportsDenormalization(): array
    {
        return [
            'case true' => [
                'type' => \DateTime::class,
                'data' => 1000,
                'expected' => true,
            ],
            'case false' => [
                'type' => \DateTime::class,
                'data' => 'aza',
                'expected' => false,
            ],
        ];
    }

    /**
     * @dataProvider dataSupportsDenormalization
     */
    public function testSupportDenormalization($type, $data, bool $expected): void
    {
        $actual = $this->testedObject->supportsDenormalization($data, $type);

        $this->assertEquals($expected, $actual);
    }

    public function dataDenormalize(): array
    {
        return [
            'case int' => [
                'data' => 1000,
                'expected' => (new \DateTime())->setTimestamp(1),
            ],
        ];
    }

    /**
     * @dataProvider dataDenormalize
     */
    public function testDenormalize($data, \DateTime $expected): void
    {
        $actual = $this->testedObject->denormalize($data, 'json');

        $this->assertEquals($expected, $actual);
    }
}
