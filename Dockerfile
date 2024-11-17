FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./public /var/www/static

RUN nginx -t
