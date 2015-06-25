#!/bin/bash
pushd .
cd /var/ibagit/ADS1/
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs npm
npm install bower
npm install body-parser
npm install cookie-parser
npm install debug
npm install express
npm install jade
npm install morgan
npm install serve-favicon
npm install request
npm install ejs
popd
