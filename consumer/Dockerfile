FROM node:14.15.1

RUN mkdir /src

ENV NODE_ENV=production

WORKDIR /home/node/app
RUN npm install

## Launch the wait tool and then your application
CMD npm run startprod
