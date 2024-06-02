FROM node:18.18-alpine as build

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm i -g pnpm
COPY ["package.json", "pnpm-lock.yaml", "/home/team3/"]
WORKDIR /home/team3
RUN pnpm i
COPY [".", "."]
RUN pnpm build
# RUN ./node_modules/.bin/vite build --mode development

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/team3/dist /var/www/ditre/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]