# Movie API

API movies CRUD, created using the followin thechnologies

- Node.js
- Express.js
- Express-validator
- PostgreSQL
- Sequelize
- Passport (local,jwt)
- jsonwebtoken
- SendGrid
- Postman
- Docker

## Run the proyect in local

1. Write the environment variables in a .env file (this are called on the `config/confi.js` file and in the
   `docker-compose.yml` file):

```env
# node
NODE_ENV=''
PORT=3000
# Docker postgreSQL image
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
# Docker pgadmin image
PG_ADMIN_EMAIL=''
PG_ADMIN_PASSWORD= ''
# node-postgres-client
HOST_DB=''
PORT_DB=5432
# jwt secret key
JWT_SECRET='SECRET_KEY'
# send_grid
SENDGRID_API_KEY='SENDGRID_API_KEY_SECRET'
```

> For the sengrid you must have an API KEY that the service give you.[Sengrid-Node](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs) and change the sender on the user.service (sendMail)

2. Charge the container of postgreSQL:`docker compose up -d`

   > If you have an instance of postgreSQL and pgadmin this step is not necesary (Write the respective environment variables).

3. run `npm start`

## API Documentation

- [Postman](https://documenter.getpostman.com/view/18494581/UzQxM4PW)
- You can manualy import the collection on Postman with the `Movie-Api.postman_collection.json`
