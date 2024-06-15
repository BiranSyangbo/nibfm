#!/bin/bash

# Change directory to where the admin application is located
cd /home/projects/nbimf/admin-app

echo "Pulling latest changes from Git..."
git pull

echo "Switching to Node.js version 10.24.1..."
nvm use 10.24.1

echo "Installing dependencies..."
npm install

echo "Building the admin application..."
npm run build

echo "Removing existing html folder..."
rm -rf /var/www/nbimf/html

echo "Copying build files to /var/www/nbimf/html..."
scp -r ./build/* /var/www/nbimf/html

echo "Reloading nginx service..."
sudo systemctl reload nginx

echo "Deployment of admin application completed successfully."
