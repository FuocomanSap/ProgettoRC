FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install ejs --save
RUN npm install path --save

RUN npm install websocket --save

RUN npm audit fix --save


COPY . .


EXPOSE 1337

CMD ["npm", "start"]