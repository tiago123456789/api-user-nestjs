#!/bin/bash

git pull master
npm i 
npm run build
npm run typeorm:run-migrations
pm2 reload api
