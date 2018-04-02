FROM node:6.11.2

LABEL maintainer="blopez@formax.cl"

WORKDIR /var/www/api

COPY . /var/www/api

RUN npm install -g nodemon

CMD ["npm", "run-script", "startdev"]

EXPOSE 3000