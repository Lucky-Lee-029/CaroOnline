FROM node:12
WORKDIR /usr/api
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]