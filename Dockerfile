FROM mhart/alpine-node:6.7

RUN apk add --update git

RUN npm i -g nodemon

RUN mkdir -p /app
WORKDIR /app

# TODO: remove when https://github.com/npm/npm/issues/9863 is fixed
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.\rename/fs.move/ ./lib/utils/rename.js

COPY package.json /app/
RUN npm install --quiet

COPY . /app

RUN npm run clientkit:prod

CMD ["npm", "start"]
