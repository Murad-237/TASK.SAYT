FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ unixodbc-dev \
    && npm install --production

COPY . .

EXPOSE 4425

CMD ["node", "server.js"]
