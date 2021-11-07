#!/bin/sh

CURRENT_FRONT_SHA=$(find ./frontend-react/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')
CURRENT_BACK_SHA=$(find ./symfony/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')

if [ "$CURRENT_FRONT_SHA" = $PREVIOUS_FRONT_SHA ]; then
    echo "THE FRONTEND SOURCE CODE HAS NOT BEEN MODIFIED. THE CI WILL NOT RUN"
else
  docker-compose -f docker-compose-test-react.yaml up -d
  docker-compose exec react yarn eslint-fix
  docker-compose exec react yarn test src/ --watchAll=false
fi

if [ "$CURRENT_BACK_SHA" = $PREVIOUS_BACK_SHA ]; then
  echo "THE BACKEND SOURCE CODE HAS NOT BEEN MODIFIED. THE CI WILL NOT RUN"
else
  docker-compose -f docker-compose-test-symfony.yaml up -d
  docker-compose exec symfony composer install
  docker-compose exec symfony ./vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php -v --dry-run --stop-on-violation --using-cache=no
  docker-compose exec symfony make yamlint
  docker-compose exec symfony make phpstan
  docker-compose exec symfony make migrations
  docker-compose exec symfony make fixtures
  docker-compose exec symfony make phpunit
fi
