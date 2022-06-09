<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Tennis\Normalizer;

use Domain\Tennis\Normalizer\CountryCodeNormalizer;
use Model\Tennis\PlayerProfile\Competitor;
use Model\Tennis\PlayerProfile\PlayerProfile;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class CountryCodeNormalizerTest extends TestCase
{
    private MockObject|ObjectNormalizer $normalizer;

    private CountryCodeNormalizer $testedObject;

    protected function setUp(): void
    {
        $this->normalizer = $this->createMock(NormalizerInterface::class);

        $this->testedObject = new CountryCodeNormalizer();
        $this->testedObject->setNormalizer($this->normalizer);
    }

    public function testNormalizeWithValidCountryCode(): void
    {
        $competitor = new Competitor();
        $competitor->countryCode = 'FRA';

        $actual = $this->testedObject->normalize($competitor);

        $this->assertArrayHasKey('countryCode', $actual);
        $this->assertSame('FR', $actual['countryCode']);
    }

    public function testNormalizeWithInvalidCountryCode(): void
    {
        $this->expectException(\Exception::class);

        $competitor = new Competitor();
        $competitor->countryCode = 'hello';

        $this->testedObject->normalize($competitor);
    }

    public function testNormalizeWithTaipeiCountryCode(): void
    {
        $competitor = new Competitor();
        $competitor->countryCode = 'TPE';

        $actual = $this->testedObject->normalize($competitor);

        $this->assertArrayHasKey('countryCode', $actual);
        $this->assertSame('TW', $actual['countryCode']);
    }

    /** @dataProvider dataSupportsNormalization */
    public function testSupportsNormalization(mixed $data, bool $expected): void
    {
        $actual = $this->testedObject->supportsNormalization($data);

        $this->assertSame($actual, $expected);
    }

    public function dataSupportsNormalization(): array
    {
        return [
            'case true' => [
                'data' => new Competitor(),
                'expected' => true,
            ],
            'case false' => [
                'data' => new PlayerProfile(),
                'expected' => false,
            ],
        ];
    }
}
