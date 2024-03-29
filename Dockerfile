FROM node:latest AS build
WORKDIR /dist/src/app
COPY package*.json /dist/src/app/
COPY yarn* /dist/src/app/
RUN yarn
COPY . .
RUN yarn build


FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/scout-pdf-generator /usr/share/nginx/html
COPY --from=build /dist/src/app/nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
