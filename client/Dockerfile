FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG BASE_URL
ENV REACT_APP_API=${BASE_URL}

EXPOSE 3000

CMD ["npm", "start"]