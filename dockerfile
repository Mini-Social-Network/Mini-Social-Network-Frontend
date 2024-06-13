# pull the base image
FROM node:18-alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY yarn.lock ./

# rebuild node-sass
#RUN yarn add node-sass

RUN yarn install

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["yarn", "start"]