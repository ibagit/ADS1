#!/bin/bash
pushd .
cd /var/ibagit/ADS1
#need. the pushd and popd because codedeploy with cd
#will break the wholeagent
apt-get update
sudo pt-get -y install nodejs --allow-root
sudo apt-get npm install

popd
