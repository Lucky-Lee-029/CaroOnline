FROM node:12
WORKDIR /usr/socket
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["yarn", "start"]