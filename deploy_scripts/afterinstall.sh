#!/bin/bash
pushd .
cd /var/ibagit/ADS1
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
npm install
popd
