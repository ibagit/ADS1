#!/bin/bash
pushd .
cd /var/ibagit/ADS1
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs 
apt-get -y install node npm
apt-get -y install nodejs-legacy
apt-get npm install
sudo npm install express --allow-root
sudo npm install bower --allow-root
sudo nohup npm start &
popd
