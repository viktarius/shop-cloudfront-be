# Base
FROM node:16-alpine as base

WORKDIR /app

#Dependencies
COPY package*.json ./
RUN npm install

#Build
WORKDIR /app
COPY . .
RUN npm run build

#Application
FROM node:16-alpine as application

COPY --from=base /app/package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8081
EXPOSE 8081

CMD ["pm2-runtime", "dist/main.js"]
