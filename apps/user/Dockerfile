FROM node:18-alpine AS development

ARG SERVICE_NAME
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json nest-cli.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY libs/core libs/core
COPY libs/mongodb libs/mongodb
COPY libs/rabbitmq libs/rabbitmq

COPY libs/$SERVICE_NAME libs/$SERVICE_NAME
COPY apps/$SERVICE_NAME apps/$SERVICE_NAME

RUN pnpm build $SERVICE_NAME