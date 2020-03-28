FROM nginx:1.15.9

COPY ngnix-config/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ngnix-config/nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html
COPY dist/main.js /usr/share/nginx/html/dist/main.js
COPY css/indexPageStyle.css /usr/share/nginx/html/css/indexPageStyle.css

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
