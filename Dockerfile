FROM node:19-alpine
WORKDIR /usr/build
COPY tsconfig.json package.json package-lock.json /usr/build/
RUN npm ci
COPY ./src /usr/build/src/
RUN npm run build

FROM node:19-alpine
WORKDIR /usr/bot
COPY package.json package-lock.json /usr/bot/
COPY prisma prisma
RUN npm ci && npx prisma generate
COPY --from=0 /usr/build/dist /usr/bot/dist

CMD [ "npm", "run", "start" ]
