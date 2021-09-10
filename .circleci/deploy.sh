#!/bin/sh

#Setup
ssh-keyscan -p 5022 $HOSTNAME >> ~/.ssh/known_hosts
sudo apt-get update
sudo apt-get install sshpass
sudo apt install rsync
sshpass -p $SERVERPASS ssh-copy-id -p 5022 $USERNAME@$HOSTNAME

#Build react
cd frontend-react/
yarn --frozen-lockfile --prod
yarn build

#Delete server react build and transmit new on
ssh $USERNAME@$HOSTNAME -p 5022 'rm -r public_html/* && echo ----Folder build/ empty---- && exit'
scp -P 5022 -r ./build/* $USERNAME@$HOSTNAME:public_html/

#Synchronization back to server
cd ../symfony/
rsync -c -v -r -P -e 'ssh -p 5022' ./ $USERNAME@$HOSTNAME:~/symfony --include=.env.prod --include=public/.htaccess --exclude-from=.gitignore --exclude=".*" --exclude=config/jwt --delete

# install back dependencies & update database schema
ssh $USERNAME@$HOSTNAME -p 5022 'cd symfony/ && php composer.phar dump-env prod && php composer.phar install --no-dev --optimize-autoloader &&  php bin/console do:mi:mi --no-interaction && php bin/console cache:clear'
