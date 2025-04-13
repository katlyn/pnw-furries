FROM node:22-alpine AS base
RUN corepack enable

FROM base AS build
WORKDIR /usr/build
COPY tsconfig.json package.json pnpm-lock.yaml /usr/build/
RUN pnpm i --frozen-lockfile
COPY ./src /usr/build/src/
RUN pnpm build

FROM base
ENV DOCKER=TRUE
RUN apk --no-cache add curl

WORKDIR /usr/src/pnw-furs
COPY package.json pnpm-lock.yaml prisma /usr/src/pnw-furs/

RUN pnpm i --prod --frozen-lockfile && pnpx prisma generate

COPY --from=build /usr/build/dist /usr/src/pnw-furs/dist/

HEALTHCHECK CMD curl -f http://localhost:3621/

CMD [ "pnpm", "start" ]
