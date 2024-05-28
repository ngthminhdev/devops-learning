FROM node:18.18-alpine

COPY ["package.json", "package-lock.json", "/home/team3/"]

WORKDIR /home/team3

RUN npm i

COPY [".", "."]

# COPY wait-for-it.sh wait-for-it.sh
# RUN chmod +x wait-for-it.sh

EXPOSE 3000

# CMD ["wait-for-it.sh", "db:3306", "--", "npm", "run", "dev"]
CMD ["npm", "run", "dev"]



