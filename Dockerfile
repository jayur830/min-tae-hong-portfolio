FROM node
RUN npm i -g npm
RUN mkdir app
COPY . app
WORKDIR app
RUN npm i
ENTRYPOINT ["npm", "start"]