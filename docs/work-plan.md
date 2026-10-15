# ApplyTrail API — Three-Week Work Plan

## Week 1 — Design and core CRUD
- Finalise idea and scope; create a public repository and starter README.
- Design the User, JobApplication, and FollowUp entities and their relationships.
- Document REST endpoints, request/response examples, status codes, and design decisions.
- Implement and run create, list, retrieve-one, update, and delete for JobApplication.
- Add request validation, dummy seed records, and example HTTP requests.
- Review the repo from a fresh clone, capture evidence, and create the `week-1` Git tag.

## Week 2 — Authentication and robustness
- Implement sign-up/login and password hashing with a suitable password-hashing library.
- Protect write routes and derive record ownership from the authenticated user rather than trusting a submitted `userId`.
- Add relationship-focused reads for follow-ups, validation/error consistency, and edge-case handling.
- Maintain a dated issue log with at least five entries and record responses to Week 1 feedback.
- Create a `week-2` tag after checking the completed state.

## Week 3 — Quality and delivery
- Add unit and integration tests, including validation and not-found/error cases.
- Publish endpoint documentation and clean-machine setup instructions.
- Add deliberate CORS settings, auth-route rate limiting, and list pagination; review indexes.
- Deploy the API if feasible, otherwise provide a verified local run guide.
- Prepare a short walkthrough, technical reflection, AI/tool-use declaration, and `week-3` tag.

## Top risks
1. **Time and scope:** ship the required slice first; defer optional features.
2. **Database configuration:** use SQLite for local work, keep secrets out of Git, and verify migrations/seed from a clean clone.
3. **Unclear ownership before auth:** Week 1 uses an explicitly labelled seeded demo user; Week 2 must replace client-supplied ownership with authenticated identity.

**Working rule:** commit in small steps, use dummy records only, and do not tag a week until that week's deliverables have been checked.
