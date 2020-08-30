FROM node:12-alpine

WORKDIR /app
COPY package.json ./
RUN yarn --silent

COPY . .

CMD yarn start