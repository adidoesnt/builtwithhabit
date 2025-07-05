#!/bin/bash

source .envrc

echo "Installing sshpass..."
brew install sshpass

echo "Copying bootstrap assets to VPS..."

echo "Creating directories on VPS..."
sshpass -p "${ROOT_PASSWORD}" ssh root@${HOST} "mkdir -p /var/www/cms"
sshpass -p "${ROOT_PASSWORD}" ssh root@${HOST} "mkdir -p /etc/nginx/sites-available"

echo "Copying docker compose file..."
sshpass -p "${ROOT_PASSWORD}" scp docker-compose.yml root@${HOST}:/var/www/cms/docker-compose.yml

echo "Copying .env.docker file..."
sshpass -p "${ROOT_PASSWORD}" scp .env.docker root@${HOST}:/var/www/cms/.env.docker

echo "Copying nginx configuration..."
sshpass -p "${ROOT_PASSWORD}" scp nginx/directus root@${HOST}:/etc/nginx/sites-available/directus

echo "Copying bootstrap script..."
sshpass -p "${ROOT_PASSWORD}" scp scripts/bootstrap.sh root@${HOST}:/bin/bootstrap.sh

echo "Running bootstrap script..."
sshpass -p "${ROOT_PASSWORD}" ssh root@${HOST} "chmod +x /bin/bootstrap.sh && /bin/bootstrap.sh"

echo "Done!"
