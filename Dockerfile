from node
#run npm config set proxy http://cache.univ-lille1.fr:3128
#run npm config set https-proxy http://cache.univ-lille1.fr:3128
run npm install -g grunt-cli 
workdir /usr/src/app
run mkdir /tmp/node_modules logs sslcert env AccessiDys
run ln -s /tmp/node_modules /usr/src/app/AccessiDys/node_modules
add package.json /usr/src/app/AccessiDys/
run openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout sslcert/key.pem -out sslcert/cert.pem -subj "/C=/ST=/L=/O=/OU=/CN=localhost"
workdir /usr/src/app/AccessiDys
run npm install
add . /usr/src/app/AccessiDys/
add env/config.json /usr/src/app/env/
