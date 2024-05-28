FROM nginx:1.21.6-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY register.html /usr/share/nginx/html/register.html
COPY login.html /usr/share/nginx/html/login.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
