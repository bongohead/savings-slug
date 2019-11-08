WEB_DIR = 'D:/Ye/budget'
PHP_DIR = 'R:/Ye/programs-repository/php-portable/7.2'
NGINX_DIR = 'R:/Ye/programs-repository/nginx-portable'
PGSQL_DIR = 'R:/Ye/programs-repository/pgsql-portable'
CREATE_DB_DIR = FALSE


# Start PHP on 9123
shell(paste0(PHP_DIR,'/php-cgi.exe -b 127.0.0.1:9123'), wait = FALSE)

# Start Nginx
# https://www.nginx.com/resources/wiki/start/topics/tutorials/installoptions/
# http://nginx.org/en/docs/switches.html
# -p: relative directory for nginx to use
# -c: configuration file for nginx to use
shell(paste0(NGINX_DIR,'/nginx.exe -p ',NGINX_DIR,' -c ',WEB_DIR,'/config/nginx.conf'), wait = FALSE)

# Start Pgsql
# D/ needed to change drives
# Login with 04155
if (CREATE_DB_DIR) shell(paste0(PGSQL_DIR,'/bin/pg_ctl initdb -D ',WEB_DIR,'/data'))
shell(paste0(PGSQL_DIR,'/bin/pg_ctl start -D ',WEB_DIR,'/data -l ',PGSQL_DIR,'/logfile.txt'))


# Kill PHP
shell('taskkill /F /IM php-cgi.exe')
# Kill Nginx
shell('taskkill /F /IM nginx.exe')
# Closer Pgsql Server & Kill
shell(paste0(PGSQL_DIR,'/bin/pg_ctl stop -D ',WEB_DIR,'/data'))
# shell('taskkill /F /IM pgAdmin4.exe')


#echo password_hash('Pcy%3dbt11621769', PASSWORD_DEFAULT);
