# Alpha IBA application
# www.ibacorp.us


FROM ubuntu:14.04 
MAINTAINER IBACorp 

RUN apt-get update 
RUN apt-get -y install nodejs 
RUN apt-get -y install node npm
RUN apt-get -y install nodejs-legacy
RUN apt-get -y install git

ADD / /var/ibagit/ADS1/
WORKDIR /var/ibagit/ADS1/

EXPOSE 8282

RUN cd /var/ibagit/ADS1 && npm install
RUN cd /var/ibagit/ADS1 && sudo ./node_modules/bower/bin/bower install --allow-root
CMD cd /var/ibagit/ADS1 && npm start


