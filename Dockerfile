FROM node:latest
ENV APP_NAME poc-app
ENV APP_HOME /home/envuser/${APP_NAME}
WORKDIR ${APP_HOME}
COPY . .
COPY .portal.env ${APP_HOME}/.env
RUN npm install
RUN npm run build
COPY ./deployment/package.json ${APP_HOME}/package.json
COPY ./deployment/package-lock.json ${APP_HOME}/package-lock.json
COPY ./deployment/server.js ${APP_HOME}
COPY ./deployment/startup.sh ${APP_HOME}
RUN chmod 755 startup.sh
RUN npm install --verb
ENTRYPOINT ["bash","./startup.sh"]
EXPOSE 8080
