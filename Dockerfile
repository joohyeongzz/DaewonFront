# 빌드 단계
FROM node:20 AS build

WORKDIR /app


COPY client/package*.json ./

RUN npm install

COPY client/. .

EXPOSE 3000

CMD ["npm", "run", "dev"]