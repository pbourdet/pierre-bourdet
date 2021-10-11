#!/bin/bash

if [ "$APP_ENV" = "prod" ]; then
  exit 0
fi

yarn start
