FROM node:18-alpine AS development

ARG SERVICE_NAME
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json nest-cli.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY libs/core libs/core
COPY libs/rabbitmq libs/rabbitmq

COPY libs/user libs/user
COPY libs/folder libs/folder

COPY apps/$SERVICE_NAME apps/$SERVICE_NAME

RUN cd apps/$SERVICE_NAME && pnpm install
RUN pnpm build $SERVICE_NAME