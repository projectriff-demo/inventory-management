#!/bin/bash

set -eEuo pipefail

(trap 'kill 0' SIGINT; mvn spring-boot:run & npm start --prefix gui)
