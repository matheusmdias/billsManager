FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY ./src .
EXPOSE 7000
CMD [ "node", "server.js" ]

