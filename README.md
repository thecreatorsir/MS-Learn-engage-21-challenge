
# MS Learn

A web app that Fills the gap between teacher and student and let them communicate and carry on with their academic process(assignment submission and grading along with group communication) right from their houses.

## How to run:

- Clone this repository or fork it.
  `git clone https://github.com/thecreatorsir/MS-Learn-engage-21-challenge.git` or `git clone https://github.com/<your username>/MS-Learn-engage-21-challenge.git`

- Inside `MS-Learn-engage-21-challenge` go to config folder, create a new file called `keys_dev.js` which stores your `mongoURI` and `secretKey` information
  - store the database URI inside `mongoURI` variable
  - store your security key inside `secretKey` variable

 - example:
  ```
  module.exports = {
  mongoURI:
    "mongodb+srv://shubham:12345@cluster0.diazc.mongodb.net/Cluster0?retryWrites=true&w=majority",
  secretKey: "keyyy",
};
  ```
Please use above mentioned `mongoURI` and `secretKey` only!!!

- install all dependencies.
  - Client side:
    on the `client` directory type `npm install`
  - Server side:
    on the `MS-Learn-engage-21-challenge` directory type `npm install`
- Run it on node js:
    In the `MS-Learn-engage-21-challenge` directory type `npm run mslearn`

## About the web app
MS Learn: It contains all the features a student or teacher will optate for their learning and evaluation of the understanding of the subject. This app endeavours to involve every feature for the assignment submission and the corresponding evaluation by the teachers. It even consists of a discussion room to facilitate students in clarifying their doubts and encourage healthy discussions amongst peers involved.

## Its contains the following features
- Role based authentication for the teachers and students

- Uploading new assignments by the individual teachers

- Grading of the assignments submitted by the students for the opted subjects.

- Uploading answer assignments by the students to be submitted for evaluation

- Different tabs available on students dashboard according to their activity: Due assignments, grading in progress, graded assignments ,missed assignments

- Different tabs available on teachers dashboard: Due assignments, Graded assignments, Responses of the students

- Discussion room for the users of the application

## The frameworks and liberaries used for building the mslearn are :
- ReactJS for client side rendering.

- Redux for global state management using flux architecture.

- Bootstrap for UI design.

- PassportJS - for user authentication.

- Axios for http request and response.

- Bcrypt - for creating a hashed password and making the app secure.

- ExpressJS, NodeJS, Socket.io - for creating the web application and letting the user communicate.

- Json web token, every user of our API or website will be assigned a unique token, and this allows you to store the user state. And once the token expires the user will be automatically prompted to login.

## Diagrams(TO DO):
- Overall
- Teacher
- Student

## Plan of Action:
Initialise our MERN project.
- Create a template for all the required screens

- Set up a server, connect to DB and setup a test route

- Creating initial role based Authentication routes.

- Creating Api for dashboard and subject page based on user role.

- Creating an API for uploading and deleting the assignment.

- Creating an API for responding to the assignment.

- Creating an api for check response and grade the assignment.

- working on role based security check on different apis

- Working on the front end with react.

- Setting up user Auth using form from react.

- Setting Up react router and redux for global state management.

- Working on different routes using axios to reflect changes on front end.

- Working on a Discussion app. 

## Security:
Security is one of the key features for any application to stay protected. In my application I have initialised user authentication, wherein the user has to register first and then login to go to a meeting and have conversation with their peers. To ensure proper protection of the password I have used Bcrypt and hashed the password ten times, to ensure good protection as well as make it fast.
Implemented private route so that unauthorized users (not registered or logged in) can’t access the private data uploaded by the registered users of the application such as the assignments and responses of the students.

## Deployment:
I have deployed the application on Heroku. I have deployed the application using pipelines, thus whenever any new changes are committed to the file all the changes are reflected in the Heroku application as well. Below I am attaching a link to my app :
<br />
<br />
[Click here to go to the deployed web app](https://ms-learn.herokuapp.com/)

## Discussion room:
In my app I have also linked an external multi user chat room which can be anonymously used by the participants and provides space for the users to engage in light conversations outside of the meeting. For the chat room I created an Express application and deployed it on Heroku and integrated it in my application.

> lets have some discussion and help the peers

[Link to Github repo](https://github.com/thecreatorsir/Lets-discuss.git)  
[Link to deployed lets discuss app](https://ms-learn-lets-discuss.herokuapp.com/)

## Screenshots:(TO DO)
