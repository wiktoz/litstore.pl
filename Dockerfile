FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN apk add --update python3 make g++\ && rm -rf /var/cache/apk/*
RUN npm install

COPY . .

EXPOSE 3010

CMD ["npm", "run", "dev"]