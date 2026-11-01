# ApplyTrail API

ApplyTrail is a small REST API for job seekers to track saved/applied roles, application status, and follow-up dates. This repository is the Week 1 proof-of-work slice for the BuildLab Stage 1 Backend Development assignment.

## Stack
- Node.js + TypeScript + NestJS
- Prisma ORM
- SQLite for local development
- DTO validation with `class-validator`

## Week 1 scope
- Data model with related `User`, `JobApplication`, and `FollowUp` entities.
- CRUD endpoints for the main `JobApplication` entity.
- Synthetic seed data and sample requests.
- ERD and API specification in `docs/`.

## Run locally
Requirements: Node.js 20+ and npm.

1. Copy `.env.example` to `.env` in the project root. The example uses a local SQLite database.
2. Install dependencies: `npm install`
3. Generate the Prisma client: `npm run prisma:generate`
4. Create the database/migration: `npm run db:migrate`
5. Seed synthetic sample records: `npm run db:seed`
6. Start the API: `npm run start:dev`
7. Call `http://localhost:3000/applications` from Postman or the included `docs/sample-requests.http` file.

If `npm run db:migrate` prompts for a migration name, use `init`.

## Endpoints
| Method | Path | Purpose | Expected success |
|---|---|---|---|
| POST | `/applications` | Create application | 201 |
| GET | `/applications` | List applications | 200 |
| GET | `/applications/:id` | Read one application | 200 |
| PATCH | `/applications/:id` | Update application | 200 |
| DELETE | `/applications/:id` | Delete application | 200 |

The API validates body fields and rejects unknown fields. Invalid request bodies and invalid integer IDs return 400; unknown application IDs return 404.

## Week 1 limitation
This development API is not authenticated yet. Creation uses the seeded demo user's `userId` (normally `1`). Do not use real user data. Authentication and ownership checks are planned for Week 2; tests, pagination, rate limiting, final API docs, and deployment/local clean-machine verification are planned for Week 3.

## Documentation
- [Idea one-pager](docs/idea-one-pager.md)
- [Work plan](docs/work-plan.md)
- [ERD](docs/erd.md)
- [REST API specification](docs/api-spec.md)
- [Design decisions](docs/design-decisions.md)
- [Sample requests](docs/sample-requests.http)
- [Week 1 update note](docs/weekly-update-week-1.md)

## Security Notes

- Passwords are hashed with bcrypt (never stored in plain text)
- JWT authentication protects create/read/update/delete routes
- Ownership checks return 403 when a user tries to access another user's records
- Input validation with class-validator on request DTOs
- Global exception filter prevents stack traces from leaking to clients
- Secrets are loaded from environment variables (`.env` is not committed)
- CORS can be configured deliberately in production; local development uses default Nest settings
- Basic recommendation: add rate limiting on `/auth/login` and `/auth/signup` in production


## AI / source declaration
Use this section to accurately declare the tools, libraries, boilerplate, and material AI assistance actually used during development. Current draft: ChatGPT helped draft planning materials and an initial code scaffold; the participant must review, test, and understand the submitted implementation and update this statement to reflect the work actually performed.


## Authentication
- `POST /auth/signup` – create account
- `POST /auth/login` – returns JWT `access_token`

Protected routes require header:
`Authorization: Bearer <access_token>`

Users can only create/read/update/delete their own applications and follow-ups.
Follow-ups


## Follow-ups
- `POST /applications/:applicationId/follow-ups`
- `GET /applications/:applicationId/follow-ups`
- `GET /follow-ups/:id`
- `PATCH /follow-ups/:id`
- `DELETE /follow-ups/:id`


## How to run
1. Copy `.env.example` to `.env` and set `DATABASE_URL` + `JWT_SECRET`
2. `npm install`
3. `npx prisma db push`
4. `npx prisma db seed` (optional)
5. `npm run start:dev`
6. API available at http://localhost:3000

## Testing

Run tests with:

```bash
npm run test:e2e

What is tested
Auth signup and login
Login failure with wrong password (401)
Creating applications without token (401)
Creating and listing applications with token
Missing application id (404)
Creating and listing follow-ups
What is not tested (and why)
Full 403 ownership matrix across every endpoint (manually verified in Week 2; can be expanded later)
Pagination edge cases (added as a Week 3 enhancement if time allows)
Deployed production environment (local e2e covers API behaviour)
Exhaustive unit tests for every service method (priority given to integration tests of critical paths)


## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | No | Create account |
| POST | `/auth/login` | No | Login and receive JWT |

### Applications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/applications` | Yes | Create application |
| GET | `/applications` | Yes | List current user's applications |
| GET | `/applications/:id` | Yes | Get one application (owner only) |
| PATCH | `/applications/:id` | Yes | Update application (owner only) |
| DELETE | `/applications/:id` | Yes | Delete application (owner only) |
| GET /applications?page=1&limit=10
Returns paginated list for the authenticated user.

### Follow-ups
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/applications/:applicationId/follow-ups` | Yes | Create follow-up |
| GET | `/applications/:applicationId/follow-ups` | Yes | List follow-ups for application |
| GET | `/follow-ups/:id` | Yes | Get one follow-up |
| PATCH | `/follow-ups/:id` | Yes | Update follow-up |
| DELETE | `/follow-ups/:id` | Yes | Delete follow-up |

Protected routes require:
`Authorization: Bearer <access_token>`

## Setup Guide

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
Copy environment file:
bash
cp .env.example .env
Set values in .env:
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-long-random-secret"
Prepare database:
bash
npx prisma generate
npx prisma db push
npx prisma db seed
Start the API:
bash
npm run start:dev
API runs at: http://localhost:3000
Run tests
bash
npm run test:e2e

## Performance Notes

- Database indexes exist on `userId`, `status`, and `applicationId`
- List endpoints return only the authenticated user's data (smaller result sets)
- Prisma selected fields/relations are used intentionally on key queries
- Pagination is recommended for large application lists (can be enabled via `page` and `limit` query params)
- SQLite is suitable for development/demo; PostgreSQL is recommended for production deployment

# Technical Reflection – ApplyTrail API

## What changed over three weeks
- Week 1: data model, ERD, API design, core CRUD for job applications
- Week 2: JWT authentication, bcrypt password hashing, ownership checks, Follow-up relationships, validation, global error handling
- Week 3: automated e2e tests, pagination, documentation, security/performance notes, final packaging

## Key technical decisions
- NestJS + Prisma + SQLite for fast development within the 3-week window
- JWT for stateless API authentication
- Ownership checks on every sensitive route
- Nested follow-up routes under applications to match the domain model
- Global exception filter for consistent client-safe errors
- Jest + Supertest for integration tests of critical paths

## What remains risky
- SQLite is fine for demo, but not ideal for production concurrency or multi-instance deploys
- Free-tier hosting can sleep and wipe ephemeral disk if SQLite is used in production
- Test coverage is focused on critical flows; not every edge case is automated yet
- Rate limiting is recommended but not fully production-hardened

## What I would do next
- Move to PostgreSQL for production
- Add rate limiting on auth routes
- Expand tests for 403 ownership cases across all endpoints
- Add Swagger/OpenAPI UI
- Deploy to a stable hosted environment with managed database

