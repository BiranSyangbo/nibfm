#!/bin/bash

# place this file in the root directory of your project

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

# Check if a process named nbimf-server is already running
if pm2 list | grep -q "nbimf-server"; then
  echo "Process nbimf-server is already running. Restarting..."
  pm2 restart nbimf-server --update-env
else
  echo "Process nbimf-server is not running. Starting..."
  pm2 start server.js --name nbimf-server
fi

echo "Deployment of server application completed successfully."
