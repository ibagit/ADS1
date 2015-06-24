# Alpha application


FROM ubuntu:14.04
MAINTAINER IBACorp
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install node
COPY ./* /var/ibagit/ADS1/
WORKDIR /var/ibagit/ADS1/
EXPOSE 5000
EXPOSE 80
CMD npm install
CMD sudo bower install --allow-root
CMD sudo nohup npm start &


