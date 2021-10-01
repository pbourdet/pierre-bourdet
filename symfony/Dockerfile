FROM php:8.0-fpm-alpine

# Apk install
RUN apk --no-cache update && apk --no-cache add bash make

# Install pdo
RUN docker-php-ext-install pdo_mysql

# Install xdebug
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php && php -r "unlink('composer-setup.php');" && mv composer.phar /usr/local/bin/composer

# Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash && mv /root/.symfony/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www/html

COPY . .

RUN chmod +x ./docker/entrypoint.sh
