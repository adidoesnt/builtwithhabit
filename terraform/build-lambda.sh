#!/bin/bash

cd ../lambda/check-payment-intent-status
zip -r ../../terraform/check-payment-intent-status-lambda.zip index.js package.json package-lock.json node_modules
cd ../terraform
