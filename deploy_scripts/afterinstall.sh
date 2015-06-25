#!/bin/bash
pushd .
cd /var/ibagit/ADS1/
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs npm
apt-get -y install nodejs-legacy
sudo npm install bower
sudo npm install body-parser
sudo npm install cookie-parser
sudo npm install debug
sudo npm install express
sudo npm install jade
sudo npm install morgan
sudo npm install serve-favicon
sudo npm install request
sudo npm install ejs
sudo npm start &
popd
