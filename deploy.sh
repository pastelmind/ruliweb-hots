# Shell script for continuous deployment
  APP_VERSION=$(jq -r .version package.json)
  ACCESS_TOKEN=$(curl "https://accounts.google.com/o/oauth2/token" -d "client_id=$GOOG_CLIENT_ID&client_secret=$GOOG_CLIENT_SECRET&refresh_token=$GOOG_REFRESH_TOKEN&grant_type=refresh_token&redirect_uri=urn:ietf:wg:oauth:2.0:oob" | jq -r .access_token)
  echo $(curl -H "Authorization: Bearer $ACCESS_TOKEN" -H "x-goog-api-version: 2" -X PUT -T build/ruliweb-hots.$APP_VERSION.zip -v https://www.googleapis.com/upload/chromewebstore/v1.1/items/$CHROME_APP_ID)
  echo $(curl -H "Authorization: Bearer $ACCESS_TOKEN" -H "x-goog-api-version: 2" -H "Content-Length: 0" -X POST -v "https://www.googleapis.com/chromewebstore/v1.1/items/$CHROME_APP_ID/publish")