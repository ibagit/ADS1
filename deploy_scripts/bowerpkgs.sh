#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
cd /var/ibagit
sudo chmod 777 -R ADS1
cd /var/ibagit/ADS1
bower install angular#1.3.x
cd /var/ibagit
sudo chmod 755 -R ADS1
popd
