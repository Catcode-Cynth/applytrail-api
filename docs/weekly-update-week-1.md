# Week 1 - Cynthia Okechukwu - Backend - ApplyTrail API

**Delivered:**
- Idea one-pager: `docs/idea-one-pager.md`
- Work plan: `docs/work-plan.md`
- ERD: `docs/erd.md`
- API specification: `docs/api-spec.md`
- Core CRUD API: Implemented and tested the core CRUD endpoints for the ApplyTrail API using Postman.

GET /applications – List Applications: Returned 200 OK, confirming that applications can be retrieved successfully.

POST /applications – Create Application: Returned 201 Created, confirming that a new application was created successfully.

GET /applications/ – Get Application by ID: Returned 200 OK, confirming that an individual application can be retrieved by its ID.

PATCH /applications/ – Update Application: Returned 200 OK, confirming that an existing application can be updated successfully.

DELETE /applications/ – Delete Application: Returned 200 OK, confirming that an application can be deleted successfully.

Delivered: 
Validation Testing

Tested invalid input to check the API's error handling. The request returned 404 Not Found. This result requires further investigation because the expected response for invalid input is 400 Bad Request.

- Repo and `week-1` tag: https://github.com/Catcode-Cynth/applytrail-api/tags

**Changed after feedback:** No mentor feedback recorded yet.

**Key technical decisions:** Used NestJS and TypeScript to structure the backend API, with Prisma for database access. Postman was used to manually test the endpoints and verify their HTTP status codes.


**Blockers / risks:** The invalid-input response needs further investigation to confirm that the API returns the expected status code for bad requests.

**AI and sources used:** I primarily used ChatGPT for technical guidance, troubleshooting errors, clarifying backend concepts, and organising project documentation. I reviewed the suggestions, removed unnecessary or irrelevant information, and adapted the guidance to fit the project requirements. I also manually tested the API endpoints using Postman and verified their responses. ChatGPT was used as a support tool, while I made the final decisions and tested the implementation myself.


