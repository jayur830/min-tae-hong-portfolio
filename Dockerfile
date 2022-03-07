FROM node
RUN mkdir app
COPY dist/* app
WORKDIR app
ENTRYPOINT ["node", "index.js"]