# ApplyTrail API

**ApplyTrail API** is a REST API built to help job seekers organise and track their job applications. It allows users to save application details, monitor their application status, and manage follow-up activities.

I built this project as part of the **BuildLab Africa Stage 1 Backend Development Programme**, developing it over three weeks and improving it as I learned more about backend development.

## Tech Stack

- **Node.js** – JavaScript runtime.
- **TypeScript** – Strongly typed JavaScript.
- **NestJS** – Backend framework used to build the API.
- **Prisma ORM** – Database access and management.
- **SQLite** – Local development database.
- **Jest & Supertest** – Automated testing.
- **class-validator** – Request validation.
- **JWT & bcrypt** – Authentication and password security.

## Project Features

- User registration and login.
- JWT-based authentication.
- Secure password hashing with bcrypt.
- Create, retrieve, update, and delete job applications.
- Create and manage follow-up records.
- User ownership checks to prevent unauthorised access.
- Request validation and consistent error handling.
- Pagination on application listing.
- Automated end-to-end tests.

## Project Structure and Development

The project was developed in three stages:

**Week 1 – Foundation and CRUD**
- Designed the database structure and relationships.
- Created the ERD and API specification.
- Implemented the core job application CRUD endpoints.
- Added synthetic seed data and sample requests.

**Week 2 – Authentication and API Security**
- Implemented user registration and login.
- Added JWT authentication and bcrypt password hashing.
- Protected application and follow-up routes.
- Implemented ownership checks.
- Added request validation and global exception handling.

**Week 3 – Testing, Documentation and Delivery**
- Added automated end-to-end tests.
- Implemented pagination.
- Documented API endpoints and setup instructions.
- Reviewed security and performance considerations.
- Prepared the project for final submission.

## API Endpoints

### Authentication

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/auth/signup` | No | Create a user account |
| POST | `/auth/login` | No | Log in and receive a JWT |

### Applications

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/applications` | Yes | Create an application |
| GET | `/applications` | Yes | List the current user's applications |
| GET | `/applications/:id` | Yes | Retrieve one application |
| PATCH | `/applications/:id` | Yes | Update an application |
| DELETE | `/applications/:id` | Yes | Delete an application |

**Pagination example:**

`GET /applications?page=1&limit=10`

Returns a paginated list of applications belonging to the authenticated user.

### Follow-ups

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/applications/:applicationId/follow-ups` | Yes | Create a follow-up |
| GET | `/applications/:applicationId/follow-ups` | Yes | List follow-ups for an application |
| GET | `/follow-ups/:id` | Yes | Retrieve one follow-up |
| PATCH | `/follow-ups/:id` | Yes | Update a follow-up |
| DELETE | `/follow-ups/:id` | Yes | Delete a follow-up |

**Authentication requirement**

Protected routes require a JWT in the request header:

`Authorization: Bearer <access_token>`

Users can only access and manage their own applications and follow-up records.

## Getting Started

### Requirements

- Node.js 20 or later
- npm
- Git

### Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/Catcode-Cynth/applytrail-api.git
cd applytrail-api
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Add your local configuration:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-long-random-secret"
```

Use your own secure JWT secret. Do not commit your `.env` file to GitHub.

**4. Generate the Prisma client**

```bash
npm run prisma:generate
```

**5. Set up the database**

```bash
npm run db:migrate
```

If prompted for a migration name, use `init`.

**6. Seed the database**

```bash
npm run db:seed
```

**7. Start the development server**

```bash
npm run start:dev
```

The API will be available at:

[http://localhost:3000](http://localhost:3000)

You can test the endpoints using Thunder Client or another API testing tool.

## Testing

Automated end-to-end tests are used to check important API functionality and verify how the application responds to both successful and unsuccessful requests.

**Run the tests:**

```bash
npm run test:e2e
```

### What is covered

- User registration and login.
- Login failure with an incorrect password (**401 Unauthorized**).
- Attempting to create applications without authentication (**401 Unauthorized**).
- Creating and listing applications with a valid token.
- Requests involving missing application IDs (**404 Not Found**).
- Creating and listing follow-up records.

### Areas for further testing

- Expanding automated **403 Forbidden** ownership tests across every protected endpoint. Ownership scenarios were also manually verified during Week 2.
- Additional pagination edge cases.
- Testing against a deployed production environment.
- More exhaustive unit tests for individual service methods.

The testing approach prioritises integration and end-to-end coverage of critical application flows. These areas can be expanded as the project grows.

## Security Notes

Security was considered throughout the development of ApplyTrail.

The following measures have been implemented:

- **Password hashing:** User passwords are hashed with bcrypt rather than stored as plain text.
- **JWT authentication:** Protected routes require a valid access token.
- **Ownership checks:** Users cannot access another user's applications or follow-up records.
- **Input validation:** Request DTOs use `class-validator` and the global validation pipe to reject invalid and unexpected fields.
- **Error handling:** A global exception filter provides consistent error responses and prevents internal stack traces from being exposed to API clients.
- **Environment variables:** Sensitive configuration, including the JWT secret, is stored in environment variables. The `.env` file is excluded from version control.

**Further security improvements:**

- Add rate limiting to `/auth/login` and `/auth/signup`.
- Configure CORS explicitly for the production environment.
- Expand automated security and ownership tests.

## Performance Notes

A few decisions were made to keep database queries organised and improve API performance.

- **Database indexes:** Indexes exist on `userId`, `status`, and `applicationId` to support commonly used queries.
- **Pagination:** Application listing supports `page` and `limit` query parameters to avoid returning unnecessarily large result sets.
- **User-specific queries:** List operations return records belonging to the authenticated user.
- **Prisma queries:** Selected fields and related records are used deliberately in key database queries.
- **Database choice:** SQLite works well for local development and demonstration. PostgreSQL would be a better choice for a production environment that requires greater concurrency and scalability.

## Technical Reflection

### What changed over the three weeks

The project developed from a basic job application management API into a more structured backend application.

- **Week 1:** I focused on the database design, ERD, API specification and core CRUD operations.
- **Week 2:** I introduced authentication, password hashing, ownership checks, follow-up relationships, validation and global error handling.
- **Week 3:** I worked on automated testing, pagination, documentation, security and performance considerations, and final project packaging.

### Key Technical Decisions

- **NestJS and TypeScript:** I used NestJS because its modular structure made it easier to organise the different parts of the application.
- **Prisma and SQLite:** These made database modelling and local development more manageable within the project timeline.
- **JWT authentication:** This allowed the API to use token-based authentication for protected routes.
- **Ownership checks:** These ensure that users can only manage their own records.
- **Nested follow-up routes:** Follow-ups are associated with job applications, reflecting how they relate to the application's data model.
- **Jest and Supertest:** These were used to test important API flows and verify expected responses.

### What Still Needs Improvement

Although the core functionality is in place, there are areas I would improve before treating the project as production-ready.

- Move from SQLite to PostgreSQL for production.
- Introduce rate limiting on authentication routes.
- Expand automated tests for ownership and additional edge cases.
- Add a Swagger/OpenAPI interface.
- Deploy to a stable hosting environment with a managed database.

### What I Would Do Next

My next steps would be to improve the production readiness of the API, strengthen its automated test coverage, and explore additional features that would make job application tracking more useful.

## AI and Source Declaration

I used ChatGPT as a support tool during the development of ApplyTrail. It helped me with planning, understanding backend concepts, working through errors, reviewing implementation decisions and drafting parts of the project documentation and code.

I also used official documentation and development libraries, including NestJS, Prisma, Jest, Supertest and other packages listed in the project's dependencies.

I reviewed and worked through the implementation, tested the API, made adjustments and used the project as an opportunity to strengthen my understanding of backend engineering.

I take responsibility for the work submitted and for understanding the implementation, its limitations and the technical decisions behind it.

## Project Documentation

Additional project documents are available in the `docs/` directory:

- [Idea One-Pager](docs/idea-one-pager.md)
- [Work Plan](docs/work-plan.md)
- [Entity Relationship Diagram](docs/erd.md)
- [REST API Specification](docs/api-spec.md)
- [Design Decisions](docs/design-decisions.md)
- [Sample API Requests](docs/sample-requests.http)
- [Week 1 Update Note](docs/weekly-update-week-1.md)

---

**Project Repository:** [github.com/Catcode-Cynth/applytrail-api](https://github.com/Catcode-Cynth/applytrail-api)

**Built by:** Cynthia Okechukwu

**Programme:** BuildLab Africa – Stage 1 Backend Development