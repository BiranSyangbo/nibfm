#!/bin/bash

# Change directory to where the server application is located
cd /home/projects/nbimf/server/

echo "Checking if Node.js version 16.18.0 is installed using nvm..."
if nvm ls | grep -q "v16.18.0"; then
  echo "Node.js version 16.18.0 is already installed."
else
  echo "Node.js version 16.18.0 is not installed. Installing..."
  nvm install 16.18.0
fi

echo "Pulling latest changes from Git..."
git pull

echo "Switching to Node.js version 16.18.0..."
nvm use 16.18.0

echo "Installing dependencies..."
npm install

echo "Restarting server with PM2..."
pm2 restart 0 --update-env

echo "Deployment of server application completed successfully."
