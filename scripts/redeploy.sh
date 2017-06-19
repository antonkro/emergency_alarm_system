#!/bin/bash

cd /var/projects/emergency_alarm_system/server
docker build -t antonkro/emergency_alarm_server .
docker stop  emergency_alarm_system 
docker rm emergency_alarm_system 
docker run -p 8080:443 --name=emergency_alarm_system -d antonkro/emergency_alarm_server

