#!/bin/bash

source .envrc

FILE_NAME=$1
PASSPHRASE=$2

if [ -z "${FILE_NAME}" ] || [ -z "${PASSPHRASE}" ]; then
    echo "Usage: $0 <file_name> <passphrase>"
    exit 1
fi

OUTPUT_FILE="${HOME}/.ssh/${FILE_NAME}"

ssh-keygen -t ed25519 -C "${ROOT_EMAIL}" -f "${OUTPUT_FILE}" -N "${PASSPHRASE}"

echo "SSH key generated and saved to ${OUTPUT_FILE}"
