#!/bin/sh

#Set gcloud config
gcloud config set run/region $GCP_REGION
gcloud config set project $GCP_PROJECT_NAME
gcloud config set compute/zone $GCP_ZONE

#Login to docker as service account
echo $GCP_ARTIFACT_ACCOUNT_KEY | docker login -u _json_key --password-stdin https://$GCP_REGION-docker.pkg.dev

#Images name and SHA variables
FRONT_IMAGE_URL=$GCP_REGION-docker.pkg.dev/$GCP_PROJECT_NAME/react-prod/front
PHP_IMAGE_URL=$GCP_REGION-docker.pkg.dev/$GCP_PROJECT_NAME/symfony-prod/php
CADDY_IMAGE_URL=$GCP_REGION-docker.pkg.dev/$GCP_PROJECT_NAME/symfony-prod/caddy
CURRENT_FRONT_SHA=$(find ./frontend-react/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')
CURRENT_BACK_SHA=$(find ./symfony/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')

#Build and push front-end image
if [ "$CURRENT_FRONT_SHA" != $PREVIOUS_FRONT_SHA ]; then
  docker build -t "$FRONT_IMAGE_URL" ./frontend-react/.
  docker push "$FRONT_IMAGE_URL"
fi

#Deploy back-end to instance
if [ "$CURRENT_BACK_SHA" != $PREVIOUS_BACK_SHA ]; then

  #Build images and push them to registry
  docker-compose -f docker-compose.prod.yaml build
  docker image tag pbourdet/symfony-prod "$PHP_IMAGE_URL"
  docker image tag pbourdet/caddy-prod "$CADDY_IMAGE_URL"
  docker image push "$CADDY_IMAGE_URL"
  docker image push "$PHP_IMAGE_URL"

  #Transfer files to instance
  echo $GCP_COMPUTE_ACCOUNT_KEY | gcloud auth activate-service-account --key-file=-
  gcloud compute config-ssh --quiet
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- 'cd ~/pierre-bourdet/ && sudo git pull origin master'

  #Pull and tag images
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker image pull "$CADDY_IMAGE_URL"
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker image pull "$PHP_IMAGE_URL"
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker image tag "$PHP_IMAGE_URL" pbourdet/symfony-prod
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker image tag "$PHP_IMAGE_URL" pbourdet/workers-prod
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker image tag "$CADDY_IMAGE_URL" pbourdet/caddy-prod

  #Stop containers and start them with new images
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo docker-compose -f ~/pierre-bourdet/docker-compose.prod.yaml down --remove-orphans
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- sudo CADDY_MERCURE_JWT_SECRET=$MERCURE_JWT_SECRET POSTGRES_PASSWORD=$POSTGRES_PASSWORD docker-compose -f ~/pierre-bourdet/docker-compose.prod.yaml up -d
  gcloud compute ssh $GCP_ENGINE_INSTANCE -- 'sudo docker image prune -f && sudo docker volume prune -f'
fi

#Deploy to Cloud Run
if [ "$CURRENT_FRONT_SHA" != $PREVIOUS_FRONT_SHA ]; then
  echo $GCP_CLOUDRUN_ACCOUNT_KEY | gcloud auth activate-service-account --key-file=-
  gcloud run deploy react --image "$FRONT_IMAGE_URL":latest
fi

#Update SHA environment variables in circleci
curl --location --request DELETE "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar/PREVIOUS_FRONT_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN"
curl --location --request DELETE "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar/PREVIOUS_BACK_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN"

curl --location --request POST "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar" \
--header "Circle-Token: $CIRCLECI_API_TOKEN" \
--header "Content-Type: application/json" \
--data-raw "{\"name\":\"PREVIOUS_FRONT_SHA\",\"value\":\"$CURRENT_FRONT_SHA\"}"
curl --location --request POST "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar" \
--header "Circle-Token: $CIRCLECI_API_TOKEN" \
--header "Content-Type: application/json" \
--data-raw "{\"name\":\"PREVIOUS_BACK_SHA\",\"value\":\"$CURRENT_BACK_SHA\"}"
