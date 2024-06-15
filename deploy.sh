#!/bin/bash

# Change directory to where the admin application is located
cd /home/projects/nbimf/adminApp

echo "Checking if Node.js version 10.24.1 is installed using nvm..."
if nvm ls | grep -q "v10.24.1"; then
  echo "Node.js version 10.24.1 is already installed."
else
  echo "Node.js version 10.24.1 is not installed. Installing..."
  nvm install 10.24.1
fi

echo "Pulling latest changes from Git..."
git pull

echo "Switching to Node.js version 10.24.1..."
nvm use 10.24.1

echo "Installing dependencies..."
npm install

echo "Building the admin application..."
npm run build

echo "Removing all item from /var/www/nbimf/html"
rm -rf /var/www/nbimf/html
mkdir /var/www/nbimf/html

echo "Copying build files to /var/www/nbimf/html..."
scp -r ./build/* /var/www/nbimf/html

echo "Reloading nginx service..."
sudo systemctl reload nginx

echo "Deployment of admin application completed successfully."