#!/bin/bash

source .envrc

FILE_NAME=$1

if [ -z "${FILE_NAME}" ]; then
  echo "Usage: $0 <file_name>"
  exit 1
fi

echo "Public Key:"
cat "${HOME}/.ssh/${FILE_NAME}.pub"

echo "Private Key:"
cat "${HOME}/.ssh/${FILE_NAME}"
