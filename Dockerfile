# Alpha application


FROM ubuntu 14.04.2
MAINTAINER IBACorp
RUN apt-get update
RUN apt-get install –y nodejs nmp
COPY ./src /src
RUN cd /src; nmp install
EXPOSE 80
CMD [“nodejs”, “/src/index.js”]

