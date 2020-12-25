cc:
	php bin/console c:c

csfix:
	./vendor/bin/php-cs-fixer fix --allow-risky=yes $(1)

phpstan:
	./vendor/bin/phpstan analyse -c phpstan.neon

yamlint:
	./vendor/bin/yaml-lint config/

codecheck:
	make csfix
	make phpstan
	make yamlint

fixtures:
	php bin/console doctrine:query:sql "DELETE FROM homestead.todo;DELETE from homestead.user;ALTER TABLE homestead.user AUTO_INCREMENT=1;ALTER TABLE homestead.todo AUTO_INCREMENT=1;"
	php bin/console doctrine:fixtures:load --no-interaction

test:
	make fixtures
	./vendor/bin/simple-phpunit

fullcheck:
	make csfix
	make phpstan
	make yamlint
	make test

coverage:
	make fixtures
	./vendor/bin/simple-phpunit --coverage-html coverage
