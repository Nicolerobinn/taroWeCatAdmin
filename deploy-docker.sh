#!/bin/bash

npm run build

docker build -t vue-admin .

docker run --name vue-admin --restart=always -p 80:80 -v /var/nginx:/var/data -d vue-admin
