# Alpha application


FROM ubuntu:14.04 
MAINTAINER IBACorp 

RUN apt-get update 
RUN apt-get -y install nodejs 
RUN apt-get -y install node npm
RUN apt-get -y install nodejs-legacy
RUN apt-get -y install git

ADD / /var/ibagit/ADS1/
WORKDIR /var/ibagit/ADS1/

EXPOSE 80

RUN cd /var/ibagit/ADS1 && npm install
RUN export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
RUN cd /var/ibagit/ADS1 && sudo bower install angular#1.3 --allow-root
CMD cd /var/ibagit/ADS1 && npm start


