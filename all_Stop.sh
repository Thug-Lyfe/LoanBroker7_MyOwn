#!/bin/sh
call pm2 delete server.js
call pm2 delete getCredit.js
call pm2 delete rulebase.js
call pm2 delete getBanks.js