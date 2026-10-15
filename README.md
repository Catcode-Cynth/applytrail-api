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

## Security / data hygiene
- Never commit `.env`, actual credentials, or real personal information.
- `.env.example` contains a placeholder SQLite connection string only.
- The seed script uses synthetic demonstration data.

## AI / source declaration
Use this section to accurately declare the tools, libraries, boilerplate, and material AI assistance actually used during development. Current draft: ChatGPT helped draft planning materials and an initial code scaffold; the participant must review, test, and understand the submitted implementation and update this statement to reflect the work actually performed.
