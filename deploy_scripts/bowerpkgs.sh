#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
export PATH=/var/ibagit/ADS1/node_modules/bower/bin:$PATH
bower install angular
bower install angular-mocks
bower install jquery
bower install bootstrap
bower install angular-route
bower install angular-resource
bower install angular-animate
popd
