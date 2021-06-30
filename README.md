# School Database - REST API using Express

This API will provide a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow users to create a new account or retrieve information on an existing account.

## Setup the project locally

- Clone the repository
- Run `npm install` **_to install dependencies_**
- Run `npm run seed` **_to create a database_**
- Run `npm start` **_to start the server_**

The server will run in http://localhost:5000/

## Test Your Application Using Postman

- You should be familiar with Postman because I've used it for this project. If you haven't already, download and install [Postman](https://www.postman.com/) now.
- The Starter Files for the project include a Postman Collection that can be used to test your application. Open Postman and import the `RESTAPI.postman_collection.json` file.
- Start your application and then use the requests in the collection to test your project.
- Another option for testing your application is to use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) package. Once you have installed that package as a dependency, you can test the app using the tests.http file.
