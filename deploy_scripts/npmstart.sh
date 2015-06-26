#!/bin/bash
pushd .
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
sudo npm start &
popd
