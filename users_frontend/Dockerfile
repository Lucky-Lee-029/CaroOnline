FROM node:12
WORKDIR /usr/users_frontend
COPY . .
RUN yarn install && yarn build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]