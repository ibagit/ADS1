# Alpha application


FROM ubuntu:14.04
MAINTAINER IBACorp
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install apache2
COPY ./* /var/www/html/
RUN cd /src; nmp install
EXPOSE 8080
EXPOSE 80
CMD [“nodejs”, “/src/index.js”]

