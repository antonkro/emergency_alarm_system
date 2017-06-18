#!/bin/bash

cd /var/projects/emergency_alarm_system/server
docker build -t antonkro/emergency_alarm_server .
docker run -p 49160:443 --name=emergency_alarm_system -d antonkro/emergency_alarm_server 

