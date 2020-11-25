# Notification System
>This is a notification system implemented using NodeJs/Mysql/Sequelize/RabbitMq.
It's build with scalability in mind, so messages created are being produced on an queue, and there is sample model to consume the message queue, but there can be mulptiple consumers

[![Build Status](https://travis-ci.com/AndrewHany/Notification-System.svg?branch=main)](https://travis-ci.com/AndrewHany/Notification-System)


### How to run
```sh
docker-compose up
```

### Design and Architecture
The notification system consists of a producer and a consumer, connected together using a rabbitmq instance

##### Architecture
![architecture](/.docs/arch.jpg?raw=true "Architecture")

#### Database design
![database](/.docs/db.jpg?raw=true "Database")

#### Services
| service | description |
| ------ | ------ |
| Notification APIs | Handles requests and routing of notifications, adds messages to database and sends it forward to rabbitmq for consumers |
| Subscribers APIs | Handles requests and routing of new subscribers and reading subscribers messages |
| Consumer | Reads messages from rabbitmq, and send it forward to processor |
| Processor | Constructs message for providers and handles translation |
| Providers | Notifications providers (not implemented here, just a mock!) |

#### APIs
| method | api | description |
| ------ | ------ |------|
| POST | `api/notifications` | Creates and sends a new notification given userTokens list |
| GET | `api/notifications` | Retrieves all notifications |
| POST | `api/subscribers` | Creates a new subscriber + device |
| POST | `api/subscribers/deactivate` | Deactivate a subscriber's device |
| GET | `api/subscribers` | Retrieves all subscribers |
| GET | `api/subscribers/{userToken}/pushNotifications` | Retrieves all subscriber push notifications using userToken |

##### Detailed API docs - Swagger
The project apis are documented using swagger and shown using swagger-ui
to access the api documentation
- Run containers
- Visit http://localhost:8081/ from browser 
_[change port according to .env configuration]_

### Sample flow
- Run containers
- Add subscriber  ( _userToken: a,deviceToken: b_ ) `POST: api/subscribers/`
- Add a new push Notification  (usersToken: [a], type: 'PUSH') `POST: api/notifications` ( _new notification is now linked with subscriber already added_)
- Check Consumer logs for providers handling new message
- Get subscriber notifications `GET: api/subscribers/{userToken}/pushnotifications`
_response should contain newly created push notification_

### Tech

The packages which made that project possible:
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Rabbitmq] - the most widely deployed open source message broker
* [Sequelize] - promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
* [MySQL] - open-source relational database management system
* [Docker] -  a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers
* [amqplib] - AMQP library and client for Node.JS
* [Swagger] - Interface Description Language for describing RESTful APIs expressed using JSON
* [Jest] - a delightful JavaScript Testing Framework with a focus on simplicity

### Tests
to run api tests, write `npm test` inside the producer 


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [rabbitmq]: <https://www.rabbitmq.com/>
   [Sequelize]: <https://sequelize.org/>
   [MySQL]: <https://www.mysql.com/>
   [amqplib]: <https://www.npmjs.com/package/amqplib>
   [Swagger]: <https://swagger.io/>
   [Jest]: <https://jestjs.io/>
   [Docker]: <https://www.docker.com/>

License
----

MIT
