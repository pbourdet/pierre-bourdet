#!/bin/bash

echo "$APP_ENV"

if [ "$APP_ENV" = "prod" ]; then
  yarn --frozen-lockfile --prod
  yarn build;
else
  yarn install
fi
