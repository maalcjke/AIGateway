FROM node:22-alpine
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production

CMD ["node", "dist/main"]