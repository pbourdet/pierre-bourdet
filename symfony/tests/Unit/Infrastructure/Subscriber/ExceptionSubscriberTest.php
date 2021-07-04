<?php

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Subscriber;

use Infrastructure\Subscriber\ExceptionSubscriber;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriberTest extends TestCase
{
    private ExceptionSubscriber $testedObject;

    protected function setUp(): void
    {
        $this->testedObject = new ExceptionSubscriber();
    }

    public function testGetSubscribedEvents(): void
    {
        $this->assertArrayHasKey(KernelEvents::EXCEPTION, ExceptionSubscriber::getSubscribedEvents());
    }

    public function testProcessException(): void
    {
        $statusCode = 400;
        $message = 'Bad request';

        $exception = new HttpException($statusCode, $message);

        $request = $this->getMockBuilder(Request::class)->disableOriginalConstructor()->getMock();
        $httpKernel = $this->getMockBuilder(HttpKernelInterface::class)->getMock();

        $event = new ExceptionEvent($httpKernel, $request, 1, $exception);

        $this->testedObject->processException($event);

        $response = $event->getResponse();
        $content = $response->getContent();
        $decodedContent = json_decode($content, true);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertJson($content);
        $this->assertArrayHasKey('message', $decodedContent);
        $this->assertEquals($statusCode, $decodedContent['code']);
    }
}
