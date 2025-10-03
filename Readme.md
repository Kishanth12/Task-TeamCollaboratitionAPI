# TaskTeamCollaboration API

A role-based task collaboration API built with Node.js, Express, MongoDB, and Socket.IO.  
The system enables Admins, Managers, and Employees to work collaboratively on tasks, teams, and reports with real-time notifications.

## Features

### Authentication & Authorization

- JWT-based Login, Logout, and Registration
- Role-based Access Control
  - Admin – Full system access
  - Manager – Manage team tasks and members
  - Employee – Update their own task status

### User Management (Admin)

- Update User (Role: Employee, Manager, Admin)
- Get All Users
- Get Single User Info
- Delete User

### Teams Management (Admin)

- Create Team
- Update Team
- Delete Team
- Get Single Team
- Get All Teams
- Get Team Members-(Manager Only)

### Task Management

#### Admin & Manager

- Create Task
- Edit/Update Task
- Get All Tasks
- Get Single Task Info
- Delete Task
- Assign/Reassign tasks to Employees

#### Employee

- Update their own task status only(todo,in-progress,done)

### Comments

- Admin – Comment on all tasks
- Manager – Comment only on their team’s tasks
- Employee – Comment only on their own tasks

### Reports (Admin Only)

- Tasks per Team
- Tasks per Status
- Overdue Tasks

### Real-Time Notifications

- Socket.IO integration for live updates (task assigned, reassigned, commented, updated)
- LogController used for managing and storing notification events

## Test Notifications

To receive live notifications (task(assigned, reassigned), updated, or commented), a user must connect as a Socket.IO client and provide their userId.

## Validations

Input validation using Express Validator

---

## Repository

You can find the source code here:  
[Task-TeamCollaboratitionAPI](https://github.com/Kishanth12/Task-TeamCollaboratitionAPI.git)

---

## Installation Setup

### Step 1: Clone the repository

### Step 2:Run `npm install`

### Step 3: Create a `.env` file with MONGODB_URI and PORT

-example
-PORT=5001
-MONGODB_URI=<your-mongodb-uri>
-JWT_SECRET=<yourSecret>

### Step 4: Run `npm run dev`

## Postman Collection

Import `taskTeamCollaboratitionAPI.postman_collection.json` in Postman to test all API endpoints easily.

## Admin Details

Email="admin@gmail.com"
password="12345678"
