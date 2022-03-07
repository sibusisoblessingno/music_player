FROM node:14-alpine3.13

COPY package.json ./

RUN npm i

COPY . ./

EXPOSE 5000

CMD ["npm", "run", "server"]
