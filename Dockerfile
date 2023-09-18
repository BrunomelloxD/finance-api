FROM node:18-alpine as builder

RUN mkdir -p /home/bruno/app
WORKDIR /home/bruno/app

RUN npm i -g prisma

RUN npx prisma generate

COPY package*.json /home/bruno/app
RUN npm i

COPY . .

EXPOSE 3000:3000

CMD ["npm", "run", "dev"]
