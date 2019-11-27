#!/bin/bash

set -eEuo pipefail

(trap 'kill 0' SIGINT; ./mvnw spring-boot:run & npm start --prefix gui)
