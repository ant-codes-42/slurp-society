const forceDatabaseRefresh = false; // enforces no refresh when database restarts

//imports
import express from 'express'; // allows server creation
import sequelize from './config/connections.js'; // imports instance of database
import routes from './routes/index.js'; // imports routes to handles HTTP requests

const app = express(); // creates instance of express app
const PORT = process.env.PORT || 3001; // opens server on port 3001

app.use(express.static('../client/dist')); // serves static files

app.use(express.json()); // parses JSON request bodies
app.use(routes); // handles API requests

sequelize.sync({ force: forceDatabaseRefresh }).then(() => { //synqs sequelize models with database. creates tables if the dont exist 
    app.listen(PORT, () => { // starts server on port
        console.log(`Server is listening on port ${PORT}`)
    });
});

