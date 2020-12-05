FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && \
  npm rebuild bcrypt --build-from-source
COPY . .
EXPOSE 8080
CMD [ "node", "server/server.js" ]