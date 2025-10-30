const express = require('express'); //importing express module

const app = express(); //creating express app

let events = []   // array for storing events
let registrations = []   // array for storing registrations

app.use(express.json()); // middleware to parse json

// Register for an event
app.post('/registration', (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let eventTitle = request.body.eventTitle;

    if (!name || !email || !eventTitle) {
        return response.status(400).json({ message: 'Please provide name, email, and event title' });
    }

    let eventIndex = events.findIndex(function(event) {
        return event.title.toLowerCase() === eventTitle.toLowerCase();
    });

    if (eventIndex === -1) {
        return response.status(404).json({ message: 'Event not found' });
    }

    let exists = false;
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].name.toLowerCase() === name.toLowerCase() && registrations[i].eventTitle.toLowerCase() === eventTitle.toLowerCase()) {
            exists = true;
            break;
        }
    }

    if (exists) {
        return response.status(409).json({ message: 'Already registered for this event' });
    } else {
        if (parseInt(events[eventIndex].capacity) > 0) {
            registrations.push({
                name: name,
                email: email,
                eventTitle: eventTitle,
                eventDesc: events[eventIndex].desc,
                eventDate: events[eventIndex].date,
                eventTime: events[eventIndex].time
            });

            events[eventIndex].capacity = parseInt(events[eventIndex].capacity) - 1;

            return response.status(200).json({
                message: 'Registration successful',
                registration: registrations[registrations.length - 1]
            });
        } else {
            return response.status(400).json({ message: 'Event is full' });
        }
    }
});

// Get all registrations
app.get('/getregistration', (request, response) => {
    response.status(200).json({
        message: 'All registrations retrieved successfully',
        registrations: registrations
    });
});

// Get one registration by name
app.post('/getoneregistration', (request, response) => {
    let name = request.body.name;

    if (!name) {
        return response.status(400).json({ message: 'Please provide a name' });
    }

    let found = [];
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].name === name) {
            found.push(registrations[i]);
        }
    }

    if (found.length === 0) {
        return response.status(404).json({ message: 'No registration found with that name' });
    }

    response.status(200).json({
        message: 'Registration(s) found successfully',
        registrations: found
    });
});

// Update registration
app.put('/updateregistration', (request, response) => {
    let name = request.body.name;
    let newName = request.body.newName;
    let newEmail = request.body.email;

    if (!name) {
        return response.status(400).json({ message: 'Please provide the name of the registration to update' });
    }

    let found = false;
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].name.toLowerCase() === name.toLowerCase()) {
            if (newName) {
                registrations[i].name = newName;
            }
            if (newEmail) {
                registrations[i].email = newEmail;
            }
            found = true;
        }
    }

    if (!found) {
        return response.status(404).json({ message: 'Registration not found' });
    }

    response.status(200).json({
        message: 'Registration updated successfully',
        registrations: registrations
    });
});

// Delete registration
app.delete('/deleteregistration', (request, response) => {
    let name = request.body.name;

    if (!name) {
        return response.status(400).json({ message: 'Please provide a name to delete registration' });
    }

    let beforeDelete = registrations.length;
    registrations = registrations.filter(function(reg) {
        return reg.name.toLowerCase() !== name.toLowerCase();
    });

    if (registrations.length === beforeDelete) {
        return response.status(404).json({ message: 'Registration not found' });
    }

    response.status(200).json({
        message: 'Registration deleted successfully'
    });
});

// Add new event
app.post('/postevent', (request, response) => {
    let title = request.body.title;
    let desc = request.body.desc;
    let date = request.body.date;
    let time = request.body.time;
    let capacity = request.body.capacity;

    if (!title || !desc || !date || !time || !capacity) {
        return response.status(400).json({ message: 'Please provide title, desc, date, time, and capacity' });
    }

    events.push({
        title: title,
        desc: desc,
        date: date,
        time: time,
        capacity: capacity
    });

    response.status(200).json({
        message: 'Event added successfully',
        event: {
            title: title,
            desc: desc,
            date: date,
            time: time,
            capacity: capacity
        }
    });
});

// Get all events
app.get('/getevent', (request, response) => {
    response.status(200).json({
        message: 'Events retrieved successfully',
        events: events
    });
});

// Delete event
app.delete('/deleteevent', (request, response) => {
    let eventTitle = request.body.title;
    events = events.filter((event) => event.title != eventTitle);
    response.status(200).json({
        message: 'Event deleted successfully'
    });
});

// Update event
app.put('/updateevent', (request, response) => {
    let eventTitle = request.body.title;
    let title = request.body.title;
    let desc = request.body.desc;
    let date = request.body.date;
    let time = request.body.time;
    let capacity = request.body.capacity;

    let eventIndex = events.findIndex((event) => event.title === eventTitle);

    if (eventIndex === -1) {
        return response.status(404).json({ message: 'Event not found' });
    }

    events[eventIndex] = {
        title: title,
        desc: desc,
        date: date,
        time: time,
        capacity: capacity
    };

    response.status(200).json({
        message: 'Event updated successfully',
        event: {
            title: title,
            desc: desc,
            date: date,
            time: time,
            capacity: capacity
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
