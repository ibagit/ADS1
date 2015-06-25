#!/bin/bash
pushd .
cd /var/ibagit/ADS1/
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
apt-get -y install nodejs npm
apt-get -y install bower
popd
