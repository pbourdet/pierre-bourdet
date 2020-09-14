csfix:
	./vendor/bin/php-cs-fixer fix --allow-risky=yes $(1)

phpstan:
	./vendor/bin/phpstan analyse -l 8 src/

yamlint:
	./vendor/bin/yaml-lint config/

fixtures:
	php bin/console doctrine:query:sql "DELETE FROM homestead.todo;DELETE from homestead.user;ALTER TABLE homestead.user AUTO_INCREMENT=1;ALTER TABLE homestead.todo AUTO_INCREMENT=1;"
	php bin/console doctrine:fixtures:load --no-interaction

test:
	./vendor/bin/simple-phpunit

check:
	make csfix
	make phpstan
	make yamlint
	make fixtures
	make test
