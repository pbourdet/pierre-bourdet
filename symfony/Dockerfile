FROM php:8.0-fpm-alpine as symfony

# Apk install
RUN apk --no-cache update \
    && apk --no-cache add \
        bash \
        make \
        nginx \
		acl \
		fcgi \
		file \
		gettext \
		git \
		gnu-libiconv \
		$PHPIZE_DEPS \
	;

# Install pdo & opcache
RUN docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable opcache

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer

# nginx/php-fpm/symfony config
COPY ./docker/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY ./docker/symfony.ini /usr/local/etc/php/conf.d/symfony.ini
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
VOLUME /var/run/php

WORKDIR /app

# Install project
COPY . .
RUN set -eux; \
	mkdir -p var/cache var/log; \
	composer install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction; \
	composer dump-autoload --classmap-authoritative --no-dev; \
	composer symfony:dump-env prod; \
	composer run-script --no-dev post-install-cmd; \
	chmod +x bin/console; sync

RUN chown -R www-data: ./public/index.php

ENV APP_ENV=prod
COPY ./docker/startup.sh /usr/local/bin/docker-startup
RUN chmod +x /usr/local/bin/docker-startup
CMD ["docker-startup"]

FROM symfony as symfony_dev

# Install xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
COPY ./docker/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
