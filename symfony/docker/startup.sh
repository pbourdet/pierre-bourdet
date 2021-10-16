#!/bin/bash

php-fpm -D
while ! pgrep php-fpm; do sleep 0.1; done;

PHP_INI_RECOMMENDED="$PHP_INI_DIR/php.ini-production"
if [ "$APP_ENV" != 'prod' ]; then
  PHP_INI_RECOMMENDED="$PHP_INI_DIR/php.ini-development"
fi
ln -sf "$PHP_INI_RECOMMENDED" "$PHP_INI_DIR/php.ini"

if [ "$APP_ENV" = 'prod' ]; then
  bin/console lexik:jwt:generate-keypair --skip-if-exists

  if [ "$(bin/console dbal:run-sql "select count(*) from doctrine_migration_versions" | tr -d '\n' | awk -F'"' '{print $4}')" != "$(ls migrations/ | wc -l)" ]; then
    make migrations
  fi

  nginx -g 'daemon off;'
fi

rm -f .env.local.php
composer install --prefer-dist --no-progress --no-interaction

if grep -q ^DATABASE_URL= .env; then
  echo "Waiting for db to be ready..."
  ATTEMPTS_LEFT_TO_REACH_DATABASE=60
  until [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ] || DATABASE_ERROR=$(bin/console dbal:run-sql "SELECT 1" 2>&1); do
    if [ $? -eq 255 ]; then
      # If the Doctrine command exits with 255, an unrecoverable error occurred
      ATTEMPTS_LEFT_TO_REACH_DATABASE=0
      break
    fi
    sleep 1
    ATTEMPTS_LEFT_TO_REACH_DATABASE=$((ATTEMPTS_LEFT_TO_REACH_DATABASE - 1))
    echo "Still waiting for db to be ready... Or maybe the db is not reachable. $ATTEMPTS_LEFT_TO_REACH_DATABASE attempts left"
  done

  if [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ]; then
    echo "The database is not up or not reachable:"
    echo "$DATABASE_ERROR"
    exit 1
  else
    echo "The db is now ready and reachable"
  fi

  make migrations
  make fixtures
fi

bin/console lexik:jwt:generate-keypair --skip-if-exists

nginx

LOGFILE=/app/var/log/"$APP_ENV".log
if [ ! -f "$LOGFILE" ]; then
  touch "$LOGFILE"
  sleep 1
fi

tail -f "$LOGFILE"
