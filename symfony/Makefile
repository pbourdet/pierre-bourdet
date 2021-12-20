cc:
	php bin/console c:c

csfix:
	./vendor/bin/php-cs-fixer fix --allow-risky=yes $(1)

csfix-dry:
	./vendor/bin/php-cs-fixer fix -v --dry-run --stop-on-violation --using-cache=no --allow-risky=yes

phpstan:
	./vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=-1

yamlint:
	./vendor/bin/yaml-lint config/

phpunit:
	./vendor/bin/simple-phpunit

codecheck:
	make csfix
	make phpstan
	make yamlint

fixtures:
	php bin/console doctrine:fixtures:load --no-interaction

.PHONY:migrations
migrations:
	php bin/console doctrine:migration:migrate --no-interaction

test:
	make fixtures
	./vendor/bin/simple-phpunit
	make fixtures

fullcheck:
	make csfix
	make phpstan
	make yamlint
	make test

coverage:
	make fixtures
	./vendor/bin/simple-phpunit --coverage-html coverage
