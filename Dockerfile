# Alpha application


FROM ubuntu:14.04 
MAINTAINER IBACorp 

RUN apt-get update 
RUN apt-get -y install nodejs 
RUN apt-get -y install node npm
RUN apt-get -y install nodejs-legacy

ADD / /var/ibagit/ADS1/
WORKDIR /var/ibagit/ADS1/

EXPOSE 80

RUN cd /var/ibagit/ADS1 && npm install
RUN npm install bower
CMD sudo nohup npm start &


