#!/usr/bin/env bash
# Exit on error
set -e

# 1. Install NVM
# Check the NVM GitHub for the latest version number
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Install and use the required Node versions
nvm install 18.16.1
nvm install 20 # Or your desired runtime version like 22

# 3. Run the special installation process
echo "--- Installing TensorFlow with Node v18 ---"
nvm use 18.16.1
npm install @tensorflow/tfjs-node@3.18.0

echo "--- Installing other dependencies with Node v20 ---"
nvm use 20
npm install

echo "--- Build finished successfully! ---"
