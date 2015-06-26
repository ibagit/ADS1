#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
cd /var/ibagit/ADS1
apt-get -y install nodejs npm
apt-get -y install nodejs-legacy
popd
