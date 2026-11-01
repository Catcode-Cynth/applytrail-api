# Technical Reflection – ApplyTrail API

## What changed over three weeks
- Week 1: data model, ERD, API design, core CRUD for job applications
- Week 2: JWT authentication, bcrypt password hashing, ownership checks, Follow-up relationships, validation, global error handling
- Week 3: automated e2e tests, pagination, documentation (README + Swagger), security/performance notes, final packaging

## Key technical decisions
- NestJS + Prisma + SQLite for fast development within the 3-week window
- JWT for stateless API authentication
- Ownership checks on every sensitive route
- Nested follow-up routes under applications to match the domain model
- Global exception filter for consistent client-safe errors
- Jest + Supertest for integration tests of critical paths
- Pagination on application list endpoint for scalability readiness

## What remains risky
- SQLite is fine for demo, but not ideal for production concurrency or multi-instance deploys
- Free-tier hosting can sleep; ephemeral storage is risky with SQLite
- Test coverage focuses on critical flows; not every edge case is automated yet
- Rate limiting is recommended for production auth routes

## What I would do next
- Move to PostgreSQL for production
- Add rate limiting on auth routes
- Expand automated tests for full 403 ownership matrix
- Improve Swagger decorators for richer docs
- Deploy with a managed database