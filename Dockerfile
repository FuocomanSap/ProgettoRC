FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install ejs --save
RUN npm install path --save

RUN npm install express-session --save

RUN npm install bcrypt-nodejs --save

RUN npm install passport --save
RUN npm install passport-local --save
RUN npm install passport-oauth --save

RUN npm install connect-flash --save

RUN npm install cookie-parser --save

COPY . .


EXPOSE 3000

CMD ["npm", "start"]