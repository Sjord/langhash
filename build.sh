#!/bin/sh

VERSION=$(node -p "require('./package.json').version")

npm install
node_modules/.bin/webpack
cp src/*.html dist
cat src/manifest.json | sed "s/VERSION/$VERSION/g" > dist/manifest.json
