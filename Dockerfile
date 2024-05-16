FROM node:20.12.2 AS build

WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]