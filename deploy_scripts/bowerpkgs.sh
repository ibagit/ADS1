#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
sudo bower install angular
sudo bower install angular-mocks
sudo bower install jquery
sudo bower install bootstrap
sudo bower install angular-route
sudo bower install angular-resource
sudo bower install angular-animate
popd
