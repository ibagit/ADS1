#!/bin/bash
pushd .
cd /var/ibagit/ADS1
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get -y install nodejs 
apt-get -y install node npm
apt-get npm install
popd
