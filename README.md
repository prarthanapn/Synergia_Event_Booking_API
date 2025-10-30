# 🎯 Synergia Event Booking API

This is a simple **Event Booking REST API** built using **Node.js** and **Express.js** as part of **Assignment 1 – Node.js & Express Fundamentals**.  
The project demonstrates basic CRUD operations and uses **in-memory arrays** (no database) to manage events and registrations.

---

## 🧩 Features Implemented

### 📅 Event Management
- **POST /postevent** – Add a new event (title, description, date, time, capacity)  
- **GET /getevent** – View all available events  
- **PUT /updateevent** – Update existing event details  
- **DELETE /deleteevent** – Delete an event  

### 👥 Registration Management
- **POST /registration** – Register a participant for an event  
- **GET /getregistration** – View all registrations  
- **POST /getoneregistration** – View a specific participant’s registration(s)  
- **PUT /updateregistration** – Update a participant’s registration (name, email, or event)  
- **DELETE /deleteregistration** – Delete a participant’s registration  

---

## ⚙️ How It Works

- All events and registrations are stored in simple **arrays** inside the `Event.js` file.
- Each registration reduces the **event capacity** by one.
- A person (name or email) can register **only once per event**.
- Each event has:
  ```js
  {
    title: "Tech Summit 2025",
    desc: "A conference on new technologies",
    date: "2025-11-20",
    time: "10:00 AM",
    capacity: 100
  }
  ```
- Each registration stores:
  ```js
  {
    name: "John Doe",
    email: "john@example.com",
    eventTitle: "Tech Summit 2025",
    eventDesc: "A conference on new technologies",
    eventDate: "2025-11-20",
    eventTime: "10:00 AM"
  }
  ```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Make sure you have **Node.js** installed.  
Then open your project folder in terminal and run:
```bash
npm install
```

### 2️⃣ Start the Server
Run the following command:
```bash
node Event.js
```
You should see:
```
Server running on http://localhost:3000
```

---

## 📬 Testing the API with Postman

You can test all endpoints using **Postman**.  
The Postman collection file is included in this repository (under `/Postman_Collection`).

### 🔹 Example Requests

#### ➕ Add Event
**POST** `http://localhost:3000/postevent`
```json
{
  "title": "Cloud Computing Workshop",
  "desc": "A beginner-friendly session on AWS and Azure",
  "date": "2025-11-10",
  "time": "10:00 AM",
  "capacity": 50
}
```

#### 📝 Register for an Event
**POST** `http://localhost:3000/registration`
```json
{
  "name": "Alice",
  "email": "alice@gmail.com",
  "eventTitle": "Cloud Computing Workshop"
}
```

#### 👀 View All Registrations
**GET** `http://localhost:3000/getregistration`

#### 🔍 View One Participant’s Registration
**POST** `http://localhost:3000/getoneregistration`
```json
{
  "name": "Alice"
}
```

#### ✏️ Update a Registration
**PUT** `http://localhost:3000/updateregistration`
```json
{
  "name": "Alice",
  "email": "alice_new@gmail.com",
  "eventTitle": "Cloud Computing Workshop"
}
```

#### ❌ Delete a Registration
**DELETE** `http://localhost:3000/deleteregistration`
```json
{
  "name": "Alice"
}
```

---

## 🗂️ Project Structure

```
Synergia_Event_Booking_API/
│
├── Event.js                # Main Node.js application
├── package.json            # Dependencies and scripts
├── node_modules/           # Installed packages
├── Postman_Collection/     # Postman collection file
└── README.md               # Project documentation (this file)
```

---

## 💡 Key Learnings
- How to set up a basic Node.js and Express.js server  
- Handling routes and HTTP methods (GET, POST, PUT, DELETE)  
- Using in-memory data storage (arrays)  
- Sending and receiving JSON data  
- Testing APIs using Postman  

---

## 👏 Conclusion
This project demonstrates the **fundamentals of REST API development** using Node.js and Express.js.  
All APIs were tested successfully in Postman and meet the requirements of the **Synergia Event Booking System** assignment.

---
**Author:** Prarthana PN  
**Course:** Node.js & Express Fundamentals – Assignment 1  
**Date:** October 2025
````

Would you like me to include screenshots or example Postman output sections in the README (for extra polish and full marks)?
