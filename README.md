## Pre Condition

Either install RabbitMQ on system or run rabbitMQ docker image

### RabbitMQ (Docker)
  docker run -it --rm -p15672:15672 -p5672:5672 rabbitmq:3-management

To open RabbitMQ Management portal
  http://localhost:15672/#/
  
### Initialize
  npm install
  
### Start App
  npm run start
  
### Access Application
  http://localhost:3000/
