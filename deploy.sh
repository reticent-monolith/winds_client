#! /bin/bash

npm run build
docker build -t reticentmonolith/winds .
docker push reticentmonolith/winds

