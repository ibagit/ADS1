#!/bin/bash
pushd .
cd /var/ibagit/ADS1
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs 
apt-get -y install node npm
apt-get -y install nodejs-legacy
npm install
#npm install express
#npm install bower
#npm start &
popd
