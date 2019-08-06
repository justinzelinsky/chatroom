FROM node:11.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:prod"]