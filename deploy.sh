#! /bin/bash

git checkout main
git merge dev
npm run build
docker build -t reticentmonolith/winds .
docker push reticentmonolith/winds

