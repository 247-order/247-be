FROM node:12.13-alpine As development


# RUN mkdir /build-dir
# WORKDIR /build-dir
# COPY package*.json ./
# RUN npm install -g @nestjs/cli
# RUN npm install

RUN npm config set registry http://registry.npmjs.org/ --global
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# RUN ln -s /build-dir/node_modules node_modules

RUN npm install -g ts-node
RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]