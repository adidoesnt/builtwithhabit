#!/bin/bash

echo "Bootstrapping VPS..."

echo "🚀 Updating and installing dependencies..."
apt update && apt upgrade -y
apt install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    ufw \
    nginx \
    certbot \
    python3-certbot-nginx

# echo "🐳 Installing Docker..."
# curl -fsSL https://get.docker.com -o get-docker.sh
# sh get-docker.sh

# echo "🐳 Installing Docker Compose..."
# apt install docker-compose-plugin -y

echo "🧱 Setting up UFW firewall..."
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw allow 8055 # For Directus
ufw allow 'Nginx Full'
ufw --force enable

echo "🛑 Stopping Nginx to allow Certbot standalone challenge..."
systemctl stop nginx

echo "🔐 Obtaining SSL certificates with Certbot (standalone)..."
certbot certonly --standalone -d cms.builtwithhabit.com

echo "✅ SSL certificates obtained."

echo "🔧 Configuring Nginx with SSL-enabled site..."
# Symlink Nginx config (assumes it was copied via SCP)
ln -sf /etc/nginx/sites-available/directus /etc/nginx/sites-enabled/directus

echo "🔍 Testing Nginx configuration..."
nginx -t

echo "🔄 Restarting Nginx..."
systemctl start nginx

echo "🔁 Testing Certbot auto-renewal..."
certbot renew --dry-run --nginx

echo "🐳 Starting Docker Compose stack..."
cd /var/www/cms
docker compose up -d

echo "🎉 VPS setup complete! Access your site at: https://cms.builtwithhabit.com"
