#!/bin/sh

#Set gcloud config
gcloud config set run/region $GCP_REGION
gcloud config set project $GCP_PROJECT_NAME

#Login to docker and GCP as service account
echo $GCP_ARTIFACT_ACCOUNT_KEY | docker login -u _json_key --password-stdin https://$GCP_REGION-docker.pkg.dev
echo $GCP_CLOUDRUN_ACCOUNT_KEY | gcloud auth activate-service-account --key-file=-

#Images name and SHA variables
FRONT_IMAGE_URL=$GCP_REGION-docker.pkg.dev/$GCP_PROJECT_NAME/react-prod/front
BACK_IMAGE_URL=$GCP_REGION-docker.pkg.dev/$GCP_PROJECT_NAME/symfony-prod/api
CURRENT_FRONT_SHA=$(find ./frontend-react/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')
CURRENT_BACK_SHA=$(find ./symfony/ -type f \( -exec sha1sum "$PWD"/{} \; \) | awk '{print $1}' | sort | sha1sum | sed 's/\(.*\).../\1/')

#Build and push images
if [ "$CURRENT_FRONT_SHA" = $PREVIOUS_FRONT_SHA ]; then
  docker build -t "$FRONT_IMAGE_URL" ./frontend-react/.
  docker push "$FRONT_IMAGE_URL"
fi

if [ "$CURRENT_BACK_SHA" = $PREVIOUS_BACK_SHA ]; then
  docker build -t "$BACK_IMAGE_URL" --target symfony ./symfony/.
  docker push "$BACK_IMAGE_URL"
fi

#Deploy to Cloud Run
if [ "$CURRENT_FRONT_SHA" = $PREVIOUS_FRONT_SHA ]; then
  gcloud run deploy react --image "$FRONT_IMAGE_URL":latest
fi
if [ "$CURRENT_BACK_SHA" = $PREVIOUS_BACK_SHA ]; then
  gcloud run deploy symfony --image "$BACK_IMAGE_URL":latest
fi

#Update SHA environment variables in circleci
curl --location --request DELETE "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar/PREVIOUS_FRONT_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN"
curl --location --request DELETE "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/envvar/PREVIOUS_BACK_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN"

curl --location --request POST "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/PREVIOUS_FRONT_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN" \
--header "Content-Type: application/json" \
--data-raw "{\"name\":\"PREVIOUS_FRONT_SHA\",\"value\":\"$CURRENT_FRONT_SHA\"}"
curl --location --request POST "https://circleci.com/api/v2/project/$CIRCLECI_PROJECT_SLUG/PREVIOUS_BACK_SHA" \
--header "Circle-Token: $CIRCLECI_API_TOKEN" \
--header "Content-Type: application/json" \
--data-raw "{\"name\":\"PREVIOUS_BACK_SHA\",\"value\":\"$CURRENT_BACK_SHA\"}"
