<?php

declare(strict_types=1);

namespace Model\Tennis\Exception;

class RankingNotFoundException extends \DomainException
{
    public function __construct(string $name)
    {
        parent::__construct(sprintf('Could not find ranking %s', $name));
    }
}
