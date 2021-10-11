FROM node:14-alpine as react

# Apk install
RUN apk --no-cache update && apk --no-cache add bash

WORKDIR /app

ARG APP_ENV=prod
COPY . .
RUN chmod +x ./docker/install.sh
RUN ./docker/install.sh

COPY ./docker/startup.sh /usr/local/bin/docker-startup
RUN chmod +x /usr/local/bin/docker-startup
CMD ["docker-startup"]

FROM nginx:stable-alpine

WORKDIR /app

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=react /app/build /app
