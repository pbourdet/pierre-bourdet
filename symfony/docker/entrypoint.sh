#!/bin/bash
if [! -d ./vendor]; then
  composer install
fi

php bin/console lexik:jwt:generate-keypair --skip-if-exists
php bin/console do:mi:mi --no-interaction
php bin/console do:fi:lo --no-interaction
php bin/console c:c

symfony server:ca:install

if ! symfony server:status | grep "Not Running"; then
  symfony server:stop
fi

sleep 2

symfony server:start
tail -f /dev/null
