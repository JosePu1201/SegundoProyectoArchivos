FROM node:21.1.0

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .
CMD npm start