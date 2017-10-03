#!/bin/sh
call pm2 delete server.js
call pm2 delete getCredit.js
call pm2 delete rulebase.js
call pm2 delete getBanks.js

call pm2 start server.js
call pm2 start getCredit.js
call pm2 start rulebase.js
call pm2 start getBanks.js