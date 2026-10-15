# ApplyTrail REST API Specification — Week 1

Base URL (local): `http://localhost:3000`

All request bodies are JSON. Invalid or unknown fields are rejected by validation. Dates use ISO 8601 strings. The response examples are representative; generated IDs and timestamps will differ.

## 1. Create an application

**POST** `/applications`

Purpose: create a job-application record for the seeded demo user.

Request body:
```json
{
  "companyName": "Acme Labs",
  "roleTitle": "Junior Backend Developer",
  "jobUrl": "https://example.com/jobs/backend-1",
  "status": "APPLIED",
  "appliedAt": "2026-10-10T09:00:00.000Z",
  "nextFollowUpAt": "2026-10-17T09:00:00.000Z",
  "notes": "Follow up after one week.",
  "userId": 1
}
```

Success **201 Created**: returns the created application, with its user and follow-ups. Invalid body **400 Bad Request**. A user ID that does not exist returns **404 Not Found**.

Representative success response body (generated fields/IDs will differ):
```json
{
  "id": 4,
  "companyName": "Acme Labs",
  "roleTitle": "Junior Backend Developer",
  "jobUrl": "https://example.com/jobs/backend-1",
  "status": "APPLIED",
  "appliedAt": "2026-10-10T09:00:00.000Z",
  "nextFollowUpAt": "2026-10-17T09:00:00.000Z",
  "notes": "Follow up after one week.",
  "createdAt": "2026-10-15T10:00:00.000Z",
  "updatedAt": "2026-10-15T10:00:00.000Z",
  "userId": 1,
  "user": { "id": 1, "fullName": "Demo Job Seeker", "email": "demo@example.com", "createdAt": "2026-10-15T10:00:00.000Z" },
  "followUps": []
}
```

## 2. List applications

**GET** `/applications`

Purpose: list all demo application records, newest first.

Success **200 OK**: JSON array of application records using the representative object shape shown under POST. Empty state is `[]`.

## 3. Retrieve one application

**GET** `/applications/{id}`

Purpose: retrieve one application by integer ID.

Success **200 OK**: one application record using the representative object shape shown under POST. Invalid ID format **400 Bad Request**. Unknown ID **404 Not Found**.

## 4. Update an application

**PATCH** `/applications/{id}`

Purpose: update supplied application fields; omitted fields remain unchanged.

Request body example:
```json
{
  "status": "INTERVIEW",
  "nextFollowUpAt": "2026-10-20T12:00:00.000Z",
  "notes": "Interview stage - dummy note."
}
```

Success **200 OK**: updated application using the same object shape shown under POST. Invalid body or ID format **400 Bad Request**. Unknown ID **404 Not Found**.

## 5. Delete an application

**DELETE** `/applications/{id}`

Purpose: permanently delete the selected application and its follow-up records.

Success **200 OK**:
```json
{ "message": "Application 1 deleted successfully" }
```

Invalid ID format **400 Bad Request**. Unknown ID **404 Not Found**.

## Design notes / current limits
- Week 1 is an unauthenticated development API and the sample data are synthetic. Do not store real job-seeker personal information.
- `userId` is used only to connect a new record to the seeded user during Week 1. Week 2 must add authentication and ownership checks.
- Pagination, rate limiting, tests, deployment, and full OpenAPI/Swagger documentation are scheduled for Week 3 unless needed earlier to fix a blocker.
