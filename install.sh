#!/usr/bin/env bash

# download nvm installation script
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | NVM_DIR=/usr/local/nvm bash && \
# sources your bashrc to add nvm to path
source ~/.bashrc && \
# check the nvm use message
command -v nvm && \
# install most recent nodejs stable version
nvm install node && \
# list installed node version
# nvm ls && \
# use stable as current version
nvm use node && \
# list all the node versions you can install
# nvm ls-remote && \
# set the installed stable version as the default node
nvm alias default node && \

# if we reach this point we have everything we need to kick the setup off
node index.js