#!/bin/bash

cd ../lambda
zip -r ../terraform/lambda.zip index.js package.json package-lock.json node_modules
cd ../terraform
