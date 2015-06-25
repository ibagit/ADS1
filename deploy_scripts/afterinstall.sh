#!/bin/bash
pushd .
cd /var/ibagit/ADS1/
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs npm
apt-get -y install nodejs-legacy
sudo npm config set prefix /usr/local
sudo npm install bower --allow-root
sudo npm install body-parser
sudo npm install cookie-parser
sudo npm install debug
sudo npm install express
sudo npm install jade
sudo npm install morgan
sudo npm install serve-favicon
sudo npm install request
sudo npm install ejs
sudo bower install angular
sudo bower install angular-mocks
sudo bower install jquery
sudo bower install bootstrap
sudo bower install angular-route
sudo bower install angular-resource
sudo bower install angular-animate
sudo npm start &
popd
