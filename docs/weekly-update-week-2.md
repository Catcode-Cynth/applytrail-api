# Week 2 - Cynthia Okechukwu- Backend - ApplyTrail API

**Delivered:**
- Task 2.1 Authentication & Authorisation (signup, login, JWT, bcrypt, protected routes, ownership checks) – working
- Task 2.2 Relationships, validation & error handling (Follow-up endpoints, class-validator, global exception filter) – working
- Issue log with 6 entries – `/docs/issue-log.md`
- Updated Thunder Client collection (Auth, Applications, Follow-ups) including 401/403/404 cases
- Feedback response document – `/docs/week-2-feedback-response.md`

**Changed after feedback:**
- Awaiting full mentor feedback from Week 1 presentation; placeholder document created and will be updated when feedback is received.

**Key technical decisions:**
- Used JWT + Passport for authentication (stateless, suitable for API)
- Used bcrypt for password hashing (industry standard)
- Ownership checks on every mutating and sensitive read operation (returns 403)
- Nested Follow-up routes under applications (`/applications/:id/follow-ups`) to reflect the data relationship
- Global exception filter for consistent error shape and to prevent stack traces leaking to clients
- Kept SQLite + Prisma for simplicity and fast iteration in the 3-week window

**Blockers / risks:**
- Mentor feedback not fully received at time of packaging Week 2
- Free-tier hosting (if used later) may sleep – will document in Week 3
- Need to expand automated tests in Week 3

**AI and sources used:**
- Grok (xAI) – guidance on NestJS auth structure, Prisma migration issues, error filter pattern, and submission packaging. All code was reviewed, adapted, and tested by me.
- NestJS, Prisma, and Passport official docs for reference