FROM node:18.18-alpine

COPY ["package.json", "package-lock.json", "/home/team3/"]

WORKDIR /home/team3

RUN npm i

COPY [".", "."]

EXPOSE 3000

CMD ["npm", "run", "dev"]



