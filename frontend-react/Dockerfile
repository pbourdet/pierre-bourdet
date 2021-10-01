FROM node:14-alpine

# Apk install
RUN apk --no-cache update && apk --no-cache add bash make

WORKDIR /var/app/html

COPY . .

RUN yarn
