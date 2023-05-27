#!/bin/bash

git checkout master
git pull origin master
npm i 
npm run build
npm run typeorm:run-migrations
pm2 reload api
