#!/bin/sh

npm install
node_modules/.bin/webpack
cp src/*.html dist
