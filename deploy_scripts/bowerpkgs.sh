#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
cd /var/ibagit/ADS1
sudo bower install --allow-root
# angular#1.3 --allow-root
popd
