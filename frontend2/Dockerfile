# FROM nginx:1.21.6-alpine
FROM nginx:1.26.0

EXPOSE 80
COPY ["index.html", "register.html", "login.html", "/var/www/ditre/html/"]

COPY nginx.conf /etc/nginx/conf.d/default.conf
