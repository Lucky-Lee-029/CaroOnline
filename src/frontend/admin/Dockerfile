FROM node:12
WORKDIR /usr/caro/admin-frontend
COPY . .
RUN yarn install && yarn build
EXPOSE 5000
CMD ["npx", "serve", "-s", "build"]
