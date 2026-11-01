Week 3 - Cynthia - Backend - ApplyTrail API

Delivered:
- Task 3.1 Testing: Jest + Supertest e2e suite (9 passing tests) via `npm run test:e2e`
- Task 3.2 Documentation, security and delivery notes in README
- Pagination on GET /applications
- Technical reflection and declaration documents
- Final package preparation and week-3 tag

Changed after feedback:
- Continued improvements from Weeks 1–2 (auth, ownership, relationships, validation, errors)

Key technical decisions:
- Prioritised integration tests for auth and core protected flows
- Added pagination for list performance readiness
- Kept local run guide reliable while deployment was attempted

Blockers / risks:
- Watchman/icu4c local environment issue required --watchman=false
- Production DB should move from SQLite to PostgreSQL

AI and sources used:
- Grok (xAI) for testing setup, pagination, docs packaging guidance. Code reviewed and tested by me.