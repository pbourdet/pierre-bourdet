bash:
	docker compose exec symfony bash

up:
	docker compose up -d

down:
	docker compose down --remove-orphans

back-install:
	docker compose exec symfony composer install

front-install:
	docker compose exec react yarn install

install:
	make back-install
	make front-install

eslint:
	docker compose exec react yarn eslint-fix

front-test:
	docker compose exec react yarn test src/ --watchAll=false

front-check:
	make eslint
	make front-test

phpstan:
	docker compose exec symfony ./vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=-1

yamlint:
	docker compose exec symfony ./vendor/bin/yaml-lint config/

cs-fixer:
	docker compose exec symfony ./vendor/bin/php-cs-fixer fix --allow-risky=yes $(1)

rector:
	docker compose exec symfony ./vendor/bin/rector process src

code-check:
	make yamlint
	make cs-fixer
	make rector
	make phpstan

fixtures:
	docker compose exec symfony bin/console doctrine:fixtures:load --no-interaction

.PHONY:migrations
migrations:
	docker compose exec symfony bin/console doctrine:migration:migrate --no-interaction

database-test:
	docker compose exec -e APP_ENV=test symfony bin/console doctrine:database:create --if-not-exists
	docker compose exec -e APP_ENV=test symfony bin/console doctrine:migration:migrate --no-interaction

back-test:
	make back-test-unit
	make mutation
	make back-test-functional

back-test-functional:
	docker compose exec symfony rm -rf var/cache/test
	docker compose exec symfony ./vendor/bin/behat

back-test-unit:
	docker-compose exec symfony ./vendor/bin/simple-phpunit --testsuite=unit

mutation:
	docker-compose exec symfony ./vendor/bin/infection --threads=4 --min-msi=70

back-check:
	make code-check
	make back-test

pr-check:
	make back-check
	make front-check

cc:
	docker compose exec symfony bin/console cache:clear

coverage:
	docker compose exec -e APP_ENV=test symfony bin/console doctrine:fixtures:load --no-interaction
	docker compose exec -e XDEBUG_MODE=coverage symfony ./vendor/bin/simple-phpunit --coverage-html coverage
