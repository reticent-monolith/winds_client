#! /bin/bash

git checkout main
npm run build
docker build -t reticentmonolith/winds .
docker push reticentmonolith/winds

