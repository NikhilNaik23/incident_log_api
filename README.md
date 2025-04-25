# HumanChain AI Safety - Incident Log API

## Project Overview

This is a backend API service for recording and managing hypothetical AI safety incidents, built as a take-home assignment for HumanChain AI Safety. The service provides RESTful endpoints to create, retrieve, and delete incident records, supporting AI safety efforts through transparent incident tracking.

---

## Tech Stack

- **Language:** TypeScript  
- **Framework:** Node.js with Express  
- **Database:** MongoDB  
- **ODM:** Mongoose  

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  
- MongoDB (local installation or cloud instance, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/humanchain-incident-log.git
   cd humanchain-incident-log
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the project root with the following content:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/incident-log
  PORT=5000
```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The API will be available at: http://localhost:5000

# Database Schema
The Incident collection stores incident documents with the following fields:
| Field       | Type   | Description                                    |
|-------------|--------|------------------------------------------------|
| title       | String | Title of the incident (required)               |
| description | String | Detailed description of the incident (required)|
| severity    | String | Severity level (`Low`, `Medium`, `High`) (required) |
| reported_at | Date   | Timestamp when the incident was created (auto-generated) |

## API Endpoints

| Method | Endpoint             | Description              | Request Body                     | Response                          |
|--------|----------------------|--------------------------|---------------------------------|----------------------------------|
| GET    | `/api/incidents`     | Retrieve all incidents   | None                            | JSON array of incidents          |
| POST   | `/api/incidents`     | Create a new incident    | `{ title, description, severity }` | Created incident object           |
| GET    | `/api/incidents/:id` | Retrieve incident by ID  | None                            | Incident object or 404 if not found |
| DELETE | `/api/incidents/:id` | Delete incident by ID    | None                            | Success message or 404 if not found |

## Pre-populating Initial Data

You can manually add sample incidents to the database using curl commands or Postman.

### Using curl

Make sure your server is running, then run these commands in your terminal:

```bash
curl -X POST http://localhost:5000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Incident 1","description":"Test incident 1","severity":"Low"}'

curl -X POST http://localhost:5000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Incident 2","description":"Test incident 2","severity":"Medium"}'

curl -X POST http://localhost:5000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Incident 3","description":"Test incident 3","severity":"High"}'
```

### Using Postman

1. Open Postman and create a new POST request.

2. Set the request URL to `http://localhost:5000/api/incidents`.

3. In the **Body** tab, select **raw** and choose **JSON** as the format.

4. Paste one of the following JSON objects:

```json
{
  "title": "Sample Incident 1",
  "description": "Test incident 1",
  "severity": "Low"
}
```
6. Click Send to submit the request.
7. Repeat the steps with other sample incident JSON objects to add more data.

## Example curl Commands
### Get all incidents
curl -X GET http://localhost:5000/api/incidents

### Create a new incident
curl -X POST http://localhost:5000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Incident","description":"This is a test","severity":"Low"}'

### Get a specific incident by ID
curl -X GET http://localhost:5000/api/incidents/<incident_id>

### Delete an incident by ID
curl -X DELETE http://localhost:5000/api/incidents/<incident_id>

## Design Decisions & Challenges

- **Language & Framework:** Chose TypeScript with Express.js to combine strong typing with a popular, lightweight backend framework.
- **Database:** Used MongoDB for flexible document storage, which fits well with the incident data structure.
- **ODM:** Utilized Mongoose to define schemas, validate data, and simplify database operations.
- **Input Validation:** Enforced required fields and limited severity values to `Low`, `Medium`, or `High` to maintain data consistency.
- **Error Handling:** Added comprehensive error checks, such as validating MongoDB ObjectIDs and handling missing incidents gracefully.
- **Project Structure:** Separated concerns by organizing code into controllers, routes, and models for better maintainability.
- **Testing:** Used Postman for API testing and provided curl commands in the README to help others quickly test the API from the command line.
- **Challenges:** Ensuring asynchronous error handling was consistent and deciding on the best way to handle optional fields while keeping the API robust.

## Running Tests

No automated tests are included in this project.

## Contact

For questions or feedback, please contact nenavathnikhil2@gmail.com.
