#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
cd /var/ibagit/ADS1
npm start
#sudo nohup bash -c "npm start 2>&1 &"
popd
