FROM node:7.4.0

RUN npm install -g node-lambda

RUN apt-get update && apt-get install -y rsync zip

WORKDIR /hato
