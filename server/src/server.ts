const forceDatabaseRefresh = false; // enforces no refresh when database restarts

//imports
import express from 'express'; // allows server creation
import { sequelize } from './models/index.js'; // imports instance of database
import routes from './routes/index.js'; // imports routes to handles HTTP requests
import { TimeSlotService } from './services/timeSlotService.js'; // imports service to handle time slot generation
import { createTimeSlotRouter } from './routes/api/time-slot-routes.js'; // imports router to handle time slot generation and availability requests
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express(); // creates instance of express app
const PORT = process.env.PORT || 3001; // opens server on port 3001

app.use(express.static(path.join(__dirname, '../../client/dist'))); // serves static files


app.use(express.json()); // parses JSON request bodies
app.use(routes); // handles API requests

app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})


sequelize.sync({ force: forceDatabaseRefresh }).then(() => { //synqs sequelize models with database. creates tables if the dont exist 
    app.listen(PORT, () => { // starts server on port
        console.log(`Server is listening on port ${PORT}`)
    });
});

// Init time slot service with business hours
const timeSlotService = new TimeSlotService({
    openTime: '11:00',
    closeTime: '22:00',
    slotDuration: 60
});

app.use('/api/timeslot', createTimeSlotRouter(timeSlotService)); // handles time slot generation and availability requests