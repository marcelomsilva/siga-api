FROM node
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
RUN npm install -g nodemon
CMD [ "nodemon", "index.js" ]

#CMD ["node","index.js"]