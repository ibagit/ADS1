#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
cd /var/ibagit/ADS1
sudo npm install -g mocha --allow-root
cd /var/ibagit/ADS1
sudo npm install should --allow-root
cd /var/ibagit/ADS1
sudo npm install supertest --allow-root
apt-get -y install ant
# angular#1.3 --allow-root
popd
