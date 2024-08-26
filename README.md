# ToDoList-App

This is a simple To-Do application built using Node.js, Express, and MongoDB. The app allows users to create, update, and delete to-do items. It is deployed at [https://todolist-app-nithi.onrender.com](https://todolist-app-nithi.onrender.com).

## Features

- **Add a new to-do item**: Enter a task and click "Add New Item" to add it to the list.
- **Update an existing item**: Click on an item to edit and update it.
- **Delete an item**: Remove an item from the list by clicking the delete button.
- **Basic Authentication**: Simple HTTP basic authentication is implemented.

## Installation

### Prerequisites

- Node.js (v16.20.1 or above)
- npm (v7.20.3 or above)
- MongoDB Atlas (or any MongoDB instance)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
   npm install
   let connectionString = "your-mongodb-connection-string";
   npm start

### Deployment

The application is deployed on Render and can be accessed at https://todolist-app-nithi.onrender.com.

### Steps for Deployment

1. Push the code to your GitHub repository.
2. Create a new Web Service on Render: 1. Connect your GitHub repository. 2. Set up the environment variables, if any. 3. Choose the npm start as the build command.
   Deploy the app.

### Username and Password

1.USERNAME: nithi 
2.PWD: nithi

### Technologies Used

1. Node.js: JavaScript runtime for the server.
2. Express: Fast, unopinionated, minimalist web framework for Node.js.
3. MongoDB: NoSQL database for storing the to-do items.
4. Render: Cloud platform to host the app.
