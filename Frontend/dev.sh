#!/bin/bash

# Kill any process using port 3000
echo "Cleaning up port 3000..."
lsof -t -i:3000 | xargs kill -9 2>/dev/null || true

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node.js 18
nvm use 18

# Start the development server
echo "Starting development server..."
npm run dev 