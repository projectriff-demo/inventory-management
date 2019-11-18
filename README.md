# Shopping inventory back-office

This application is part of [riff](https://projectriff.io)'s shopping demo.
It exposes an API and a GUI to manage the fictional shop's inventory.

## Run

Run `./start.sh` if you built the frontend before
or run the following commands in separate terminals:

```shell script
$ mvn spring-boot:run
```

```shell script
$ cd gui
$ npm install # if not done before
$ npm start # runs ng serve
```

Angular automatically proxies call to the backend via `angular.json` configuration (see the `proxyConfig` setting in the file).

## Use a PostgreSQL database

Start a database instance using Docker:

```shell script
docker run --name postgres -e POSTGRES_PASSWORD=spring -e POSTGRES_DB=testdb -p 5432:5432 -d postgres:latest
```

Run the inventory app with a `cloud` profile:

```shell script
java -jar target/inventory-api-0.0.1-SNAPSHOT.jar --spring.profiles.active=cloud
```

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
