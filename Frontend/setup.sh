#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js 18
nvm install 18
nvm use 18

# Clean install
rm -rf node_modules package-lock.json

# Install core dependencies first
npm install -D vite @vitejs/plugin-react-swc typescript @types/node
npm install react react-dom @types/react @types/react-dom

# Install remaining dependencies
npm install

# Start the development server
npm run dev 