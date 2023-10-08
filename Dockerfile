# Dockerfile
FROM node:18-alpine

RUN mkdir -p /home/bruno/app
WORKDIR /home/bruno/app

COPY ./prisma ./prisma

COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./

RUN npm install
RUN npx prisma generate

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
