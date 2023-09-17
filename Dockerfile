FROM node:20-alpine
WORKDIR /usr/build
COPY tsconfig.json package.json package-lock.json /usr/build/
RUN npm ci
COPY ./src /usr/build/src/
RUN npm run build

FROM node:20-alpine
ENV DOCKER=TRUE
RUN apk --no-cache add curl

WORKDIR /usr/src/pnw-furs
COPY package.json package-lock.json /usr/src/pnw-furs/

COPY prisma /usr/src/pnw-furs/prisma/
RUN npm ci && npx prisma generate

COPY --from=0 /usr/build/dist /usr/src/pnw-furs/dist/

HEALTHCHECK CMD curl -f http://localhost:3621/

CMD [ "npm", "run", "start" ]
