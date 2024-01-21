FROM node:18-alpine

# Install python (for node-gyp) and bash for container interaction
RUN apk add bash \
    && apk add --no-cache python3 g++ make \
    && rm -rf /var/cache/apk/*

# upgrade npm
RUN npm install -g npm@10.3.0

# install 'ncu' command for development
RUN npm install -g npm-check-updates@latest

# make the 'app' folder the current working directory
WORKDIR /app

EXPOSE 9980

# src: https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host
#
# explanation: if node_modules folder is found, just run serve - otherwise run clean install first, then serve

CMD \[ -d "node_modules" \] && npm run dev -- --port 9980 || npm ci && npm run dev -- --port 9980
