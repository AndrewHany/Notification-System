FROM node:14.15.1

RUN mkdir /src

ENV NODE_ENV=production

WORKDIR /home/node/app
RUN npm install

EXPOSE 8081

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm run startprod
