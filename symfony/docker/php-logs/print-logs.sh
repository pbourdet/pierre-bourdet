while [ ! -f  /var/log/"${APP_ENV}".log ];
	do echo "Log file /var/log/${APP_ENV}.log does not exist yet";
	sleep 5;
done;

tail -F /var/log/"${APP_ENV}".log;
