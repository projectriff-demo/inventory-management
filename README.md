# Shopping inventory back-office

![Backend Build status](https://github.com/projectriff-demo/inventory-management/workflows/Backend%20CI/badge.svg)
![Frontend Build Status](https://github.com/projectriff-demo/inventory-management/workflows/Frontend%20CI/badge.svg)

This application is part of [riff](https://projectriff.io)'s shopping demo.
It exposes an API and a GUI to manage the fictional shop's inventory.

## Build and Deploy with riff

Build the app:

```shell script
riff application create inventory-api \
  --git-repo https://github.com/projectriff-demo/inventory-management.git \
  --tail
```

Deploy the app:

```shell script
riff knative deployer create inventory-api --application-ref inventory-api \
  --ingress-policy External \
  --env SPRING_PROFILES_ACTIVE=cloud \
  --env SPRING_DATASOURCE_URL=jdbc:postgresql://inventory-db-postgresql:5432/inventory \
  --env SPRING_DATASOURCE_USERNAME=postgres \
  --env-from SPRING_DATASOURCE_PASSWORD=secretKeyRef:inventory-db-postgresql:postgresql-password \
  --tail
```

## Run locally

Run `./start.sh` if you built the frontend before
or run the following commands in separate terminals:

```shell script
$ ./mvnw spring-boot:run
```

```shell script
$ cd gui
$ npm install # if not done before
$ npm start # runs ng serve
```
The backend will interact with a H2 database.
Angular automatically proxies call to the backend via `angular.json` configuration (see the `proxyConfig` setting in the file).

### (Optional) Use a PostgreSQL database locally

Start a database instance using Docker:

```shell script
docker run --name postgres -e POSTGRES_PASSWORD=spring -e POSTGRES_DB=testdb -p 5432:5432 -d postgres:latest
```

Run the inventory app with a `cloud` profile:

```shell script
java -jar target/inventory-api-0.0.1-SNAPSHOT.jar --spring.profiles.active=cloud
```

## Deploy to K8s

### Backend

Build the Inventory API and push to DockerHub.

```shell script
pack build --builder cloudfoundry/cnb:cflinuxfs3 -p . projectriffdemo/inventory-api
docker push projectriffdemo/inventory-api
```

Install the PostgreSQL database using a Helm chart (using Helm v2). See the [riff docs](https://projectriff.io/docs/v0.4/getting-started/minikube#install-helm) for instructions.

```shell script
helm install --name inventory-db --namespace default --set postgresqlDatabase=inventory stable/postgresql
```

To connect to your database from outside the cluster execute the following commands:

```shell script
export POSTGRES_PASSWORD=$(kubectl get secret --namespace default inventory-db-postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
kubectl port-forward --namespace default svc/inventory-db-postgresql 5432:5432
```

You can now connect to the PostgreSQL database using your favorite SQL Query tool using host `127.0.0.1` and port `5432` as user `postgres` and `inventory` as the database. The password was stored in the `POSTGRES_PASSWORD` env var.

Deploy the app deployment and corresponding service YAML:

```shell script
kubectl apply -f ./config/inventory-api-deployment.yaml
kubectl apply -f ./config/inventory-api-service.yaml
```

### Frontend

```shell script
docker build -t projectriffdemo/inventory-gui ./gui
docker push projectriffdemo/inventory-gui
```

```shell script
kubectl apply -f ./config/inventory-gui-deployment.yaml
kubectl apply -f ./config/inventory-gui-service.yaml
```

### Sample Data

To load some sample data after the `inventory-api` service has been created you can run the following command:

```shell script
./data/curl-data.sh ./data/sample-data.json
```

You can also pass in the path to another data file with data in a json format, one line per article.

## Development

### Tests

#### Backend

```shell script
$ mvn test
```

#### Frontend

```shell script
$ cd gui

# if not done before
$ npm install

# run `ng test` and watch for changes
$ npm run testwatch

# or run tests and return: `ng test --watch=false`
$ npm test

# e2e test with `ng e2e` - requires spring boot backend running in parallel
$ npm run e2e
```

#### Frontend debugging tips

For unit tests (with `karma`), changing the browser to `'Chrome'` in `karma.conf.js`
allows anyone to inspect elements and see messages in the console.

For end-to-end tests (with `Protractor`), feel free to switch the settings as instructed
in `protractor.conf.js`. It helps visualize where the end-to-end scenario fails.
