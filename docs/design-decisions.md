# Design Decisions — ApplyTrail API

1. **NestJS and TypeScript:** chosen for a structured Node.js backend and clear separation of controller, service, DTO, and persistence responsibilities.
2. **Prisma ORM:** provides a typed schema and migration workflow, making data relationships explicit and easier to maintain.
3. **SQLite for Week 1:** reduces local setup friction so the API can be run from a clean machine. The database can be moved to PostgreSQL later if deployment or mentor feedback makes that useful.
4. **Three relational entities:** User owns applications; each application may have multiple follow-ups. This satisfies the required minimum of three related entities without adding out-of-scope features.
5. **Constrained application status:** a TypeScript enum plus DTO validation prevents unsupported status values at the API boundary; SQLite stores the field as a string.
6. **DTO validation:** rejects empty names, invalid URLs, invalid date strings, invalid statuses, and unexpected fields before they reach the database.
7. **Week 1 ownership limitation:** the sample create request uses seeded `userId: 1` to demonstrate the relationship. This is not a secure multi-user design; Week 2 will add authentication and ownership checks.
