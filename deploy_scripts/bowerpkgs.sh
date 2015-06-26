#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
sudo bower install angular#1.3 --allow-root
sudo bower install angular-mocks#1.3 --allow-root
sudo bower install jquery#2.1.1 --allow-root
sudo bower install bootstrap#3.1.1 --allow-root
sudo bower install angular-route#1.3 --allow-root
sudo bower install angular-resource#1.3 --allow-root
sudo bower install angular-animate#1.3 --allow-root
popd
