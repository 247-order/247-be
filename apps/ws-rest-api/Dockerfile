FROM node:12.13-alpine AS development

RUN mkdir -p /nest
ADD . /nest

WORKDIR /nest

RUN npm config set registry http://registry.npmjs.org/ --global
RUN npm install -g @nestjs/cli
RUN npm install --production=false

EXPOSE 3000

CMD ["npm", "run", "start:debug", "ws-rest-api"]

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/ws-rest-api/main.js"]