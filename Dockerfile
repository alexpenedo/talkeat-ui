FROM node:8.1.4-alpine as builder
COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN $(npm bin)/ng build --prod

FROM nginx:1.13.3-alpine
COPY ./nginx-custom.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]