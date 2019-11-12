# Shopping inventory back-office

This application is part of [riff](https://projectriff.io)'s shopping demo.
It exposes an API and a GUI to manage the fictional shop's inventory.

## Run

In separate terminals, run:

```shell script
$ mvn spring-boot:run
```

```shell script
$ cd gui
$ npm install # if not done before
$ ng serve
```

Angular automatically proxies call to the backend via `angular.json` configuration (see the `proxyConfig` setting in the file).

## Development

### Tests

#### Backend

```shell script
$ mvn test
```

#### Frontend

```shell script
$ cd gui
$ npm install # if not done before
# continuous execution ↓
$ ng test
# single run ↓
$ ng test --watch=false 
$ ng e2e # make sure the backend runs in parallel
```

#### Frontend debugging tips

For unit tests (with `karma`), changing the browser to `'Chrome'` in `karma.conf.js`
allows anyone to inspect elements and see messages in the console.

For end-to-end tests (with `Protractor`), feel free to switch the settings as instructed
in `protractor.conf.js`. It helps visualize where the end-to-end scenario fails.
