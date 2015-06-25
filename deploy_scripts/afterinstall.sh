#!/bin/bash
pushd .
cd /var/www/foodsafety
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
npm install
popd
