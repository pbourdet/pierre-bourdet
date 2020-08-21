#!/bin/sh

#Setup
ssh-keyscan -p 5022 $HOSTNAME >> ~/.ssh/known_hosts
sudo apt-get update
sudo apt-get install sshpass
sudo apt install rsync
sshpass -p $SERVERPASS ssh-copy-id $USERNAME@$HOSTNAME -p 5022

#Build react
cd frontend-react/
yarn --frozen-lockfile --prod
yarn build

#Delete server react build and transmit new on
ssh $USERNAME@$HOSTNAME -p 5022 'rm -r build/* && echo ----Folder build/ empty---- && exit'
scp -P 5022 -r ./build/* $USERNAME@$HOSTNAME:build/

#Synchronization back to server
cd ../symfony/
rsync -av -e 'ssh -p 5022' ./ $USERNAME@$HOSTNAME:~/symfony --include=public/.htaccess --exclude-from=.gitignore --exclude=".*"

# install back dependencies
ssh $USERNAME@$HOSTNAME -p 5022 'cd symfony/ && php composer.phar install --no-dev --optimize-autoloader && php bin/console cache:clear'


