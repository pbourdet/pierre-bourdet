#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ "$1" = 'php-fpm' ] || [ "$1" = 'php' ] || [ "$1" = 'bin/console' ]; then
	PHP_INI_RECOMMENDED="$PHP_INI_DIR/php.ini-production"

	if [ "$APP_ENV" != 'prod' ]; then
		PHP_INI_RECOMMENDED="$PHP_INI_DIR/php.ini-development"
	fi

	ln -sf "$PHP_INI_RECOMMENDED" "$PHP_INI_DIR/php.ini"
	mkdir -p var/cache var/log

  if [ "$APP_ENV" = 'prod' ]; then
    bin/console secrets:decrypt-to-local --force;
    composer symfony:dump-env prod;
  fi

	if [ "$APP_ENV" != 'prod' ]; then
	  rm -f .env.local.php
		rm -f .env."${APP_ENV}".local
    composer install --prefer-dist --no-progress --no-interaction

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
	fi

  if [ "$(bin/console dbal:run-sql "select count(*) from doctrine_migration_versions" | tr -d '\n' | cut -d "(" -f2 | cut -d ")" -f1)" != "$(ls migrations/ | wc -l)" ]; then
		bin/console doctrine:migrations:migrate --no-interaction
  fi

  if [ "$APP_ENV" != 'prod' ]; then
    if [ "$RUN_FIXTURES" ]; then
      bin/console doctrine:fixture:load --no-interaction
    fi
  fi

  bin/console lexik:jwt:generate-keypair --skip-if-exists

	setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var
	setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX var
fi

exec docker-php-entrypoint "$@"
