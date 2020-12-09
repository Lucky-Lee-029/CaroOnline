FROM node:12
WORKDIR /usr/caro/api
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8000
CMD ["yarn", "start"]
