# 🔄 Adoption Status Update Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

<div align="center">
  <h3>🔄 Pet Adoption Status Update Microservice</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Update and manage pet adoption status transitions! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Adoption Status Update Service** is a specialized microservice in the Shaggy Mission platform that handles the dynamic updating of pet adoption statuses. This service enables rescue organizations, adoption centers, and volunteers to efficiently manage status transitions throughout the adoption lifecycle, ensuring accurate and real-time tracking of pet availability.

## 🎯 What This Service Does

- **Status Updates**: Update existing adoption status records for pets by Pet ID
- **Workflow Transitions**: Seamlessly transition pets between adoption states
- **Dynamic Management**: Update status and notes for existing pets in the system
- **Data Validation**: Ensure status transitions follow valid enum constraints
- **Notes Enhancement**: Add or update contextual information during status changes
- **Timestamp Tracking**: Automatic timestamp updates for all status modifications
- **Integration Support**: Designed to work with existing adoption management systems

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Data Validation**: Mongoose schema validation with enum constraints
- **Status Management**: PUT endpoint for status updates by Pet ID
- **RESTful Design**: Clean RESTful API design patterns
- **Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Comprehensive validation and error management

## 📡 API Endpoints

### Adoption Status Update
**`PUT /adoption/status/:petId`**
- Updates existing adoption status record for a specific pet
- Validates petId parameter and request body
- Supports status transitions and notes updates
- Returns updated status record with new timestamp

**Request Parameters:**
- `petId` (path): MongoDB ObjectId of the pet to update

**Request Body:**
```json
{
  "status": "reserved",
  "notes": "Reserved by Johnson family, pending home visit"
}
```

**Successful Response (200):**
```json
{
  "_id": "64f8b2a1c3d4e5f6a7b8c9d4",
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "status": "reserved",
  "notes": "Reserved by Johnson family, pending home visit",
  "updatedAt": "2024-01-15T14:30:00.000Z",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request`: Invalid petId or request data
  ```json
  {
    "message": "Invalid petId format"
  }
  ```
- `404 Not Found`: Pet status not found
  ```json
  {
    "message": "Pet status not found"
  }
  ```
- `500 Internal Server Error`: Database or server issues
  ```json
  {
    "message": "Failed to update status",
    "error": "Database connection failed"
  }
  ```

### API Documentation
**`GET /updateStatus-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Request/response schemas and validation rules
- Try-it-out functionality for testing the update endpoint

## 🔧 Core Functionality

### Status Update System
The service supports dynamic updates between all adoption statuses:

- **`not_adopted`**: Pet is available for adoption
- **`reserved`**: Pet is reserved by a potential adopter
- **`adopted`**: Pet has been successfully adopted

### Status Transition Examples
```
not_adopted → reserved  (Pet gets reserved)
reserved → adopted      (Adoption finalized)
reserved → not_adopted  (Reservation cancelled)
adopted → not_adopted   (Adoption fell through - rare)
```

### Update Features
- **Flexible Updates**: Update status, notes, or both
- **Timestamp Management**: Automatic updatedAt field refresh
- **Validation**: Enum validation for status field
- **Error Handling**: Comprehensive error responses
- **Pet ID Validation**: Validates MongoDB ObjectId format

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components:

- **Adoption Status Service**: Works with status creation service
- **Pet Management System**: Updates pet availability in real-time
- **Notification System**: Triggers alerts when status changes
- **Administrative Dashboard**: Provides real-time status updates
- **Mobile Applications**: Supports mobile adoption workflow updates
- **Reporting Services**: Tracks adoption progress and metrics

## 🔒 Data Security & Validation

- **Pet ID Validation**: Validates MongoDB ObjectId format
- **Schema Validation**: Mongoose schema ensures data integrity
- **Enum Validation**: Restrict status values to valid options
- **Input Sanitization**: Validate and sanitize all input data
- **Error Handling**: Comprehensive validation and error management
- **Data Consistency**: Maintain consistent adoption workflow states

## 🗃️ Database Schema

### AdoptionStatus Document Structure
```javascript
{
  _id: ObjectId,                    // MongoDB unique identifier
  petId: String (required, unique), // Pet's unique identifier
  status: String (enum: [           // Current adoption status
    'not_adopted',                  // Available for adoption
    'reserved',                     // Reserved by adopter
    'adopted'                       // Successfully adopted
  ], default: 'not_adopted'),
  notes: String (optional),         // Additional context/notes
  updatedAt: Date (auto-generated) // Last update timestamp
}
```

### Status Update Flow
```
1. Receive PUT request with petId parameter
2. Validate petId format (MongoDB ObjectId)
3. Find existing status record
4. Update status and/or notes
5. Save with new timestamp
6. Return updated record
```

## 📚 API Documentation

Complete API documentation is available through Swagger UI at `/updateStatus-docs` when the service is running. The documentation includes:

- **Interactive endpoint testing** with status update examples
- **Comprehensive request/response schemas** with validation rules
- **Status transition examples** and workflow explanations
- **Error handling scenarios** and status codes
- **Pet ID validation** requirements and formats
- **Integration examples** and common use cases

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                         # MongoDB connection setup
├── controllers/
│   └── status.controller.js          # Status update logic
├── models/
│   └── status.model.js               # Mongoose AdoptionStatus schema
├── routes/
│   └── status.routes.js              # API route definitions
├── docs/
│   └── swagger.yaml                  # OpenAPI specification
├── app.js                            # Express application setup
└── server.js                         # Server startup and configuration
```

### Testing the API
```bash
# Update adoption status
curl -X PUT http://localhost:3014/adoption/status/64f8b2a1c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "reserved",
    "notes": "Reserved by Johnson family, pending home visit"
  }'

# Expected response: 200 OK with updated status object
```
## 📊 Common Use Cases

### Daily Operations
- **Status Maintenance**: Update pet statuses as situations change
- **Reservation Management**: Track pets reserved by potential adopters
- **Adoption Processing**: Update pets to adopted status when finalized
- **Data Corrections**: Fix incorrect status information

### Workflow Management
- **Volunteer Updates**: Field workers update pet statuses remotely
- **Administrative Review**: Supervisors review and update status records
- **Integration Updates**: External systems trigger status updates
- **Batch Processing**: Update multiple pets during scheduled operations

### Integration Scenarios
- **Mobile App Updates**: Support mobile adoption workflow updates
- **Web Portal**: Enable online status updates for staff
- **Automated Systems**: API integration with external adoption platforms
- **Reporting Integration**: Feed updated data to analytics systems

## 🔧 Error Handling

### Validation Errors
- **Invalid Pet ID**: Returns 400 with descriptive message
- **Invalid Status**: Returns 400 for non-enum status values
- **Missing Data**: Returns 400 for required field validation
- **Format Errors**: Returns 400 for malformed request bodies

### System Errors
- **Database Connection**: Returns 500 with connection error details
- **Not Found**: Returns 404 when pet status doesn't exist
- **Server Errors**: Returns 500 with appropriate error messages
- **Timeout Handling**: Graceful handling of database timeouts

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Helping every pet find their perfect forever home!</em></p>
  <p>📖 <a href="/updateStatus-docs">View API Documentation</a></p>
</div>