FROM node:10.8.0-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm config set strict-ssl false
ARG PROXY
ENV HTTP_PROXY=${PROXY}
ENV HTTPS_PROXY=${PROXY}
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]






## Installing React-app using multi-stage build
## Build environment
#FROM node:9.6.1 as builder
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#RUN npm config set strict-ssl false
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
### Configure proxy
#ARG PROXY
#ENV HTTP_PROXY=${PROXY}
#ENV HTTPS_PROXY=${PROXY}
#COPY package.json /usr/src/app/package.json
### Install packages
#RUN npm install
#RUN npm install react-scripts@1.1.1 -g --silent
#COPY . /usr/src/app
### Compile .js files
#RUN npm run build
#
#
## Production environment
#FROM nginx:1.13.9-alpine
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]