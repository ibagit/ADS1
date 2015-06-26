#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
cd /var/ibagit/ADS1
sudo nohup npm start &
popd
