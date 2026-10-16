# ApplyTrail API — Week 1 Idea One-Pager

**Idea Name:** ApplyTrail API
**Track:** Backend Development  
**Stack:** Node.js, TypeScript, NestJS, Prisma ORM, SQLite (local development)  
**Target user:** An early-career job seeker applying to multiple roles who needs a reliable place to track each application and next action.  
**Problem:** Applications, status updates, and follow-up dates can be scattered across email, notes, and spreadsheets. ApplyTrail keeps the application pipeline in one structured record and connects each application to follow-up reminders.

## Entities
1. **User** — a person who owns a set of applications.
2. **JobApplication** — a role a user has saved or applied for, its status, dates, and notes.
3. **FollowUp** — a dated action/reminder associated with one application.

## Core flow
Create a job application → retrieve the application list or one application → update its status or follow-up date → delete an obsolete record.

## In scope 
- CRUD API for job applications.
- Relationships between users, applications, and follow-ups.
- Input validation and consistent HTTP status behaviour.
- Authentication/ownership checks in Week 2.
- Tests, API documentation, security basics, and a reproducible local run guide in Week 3.

## Out of scope
- Job-board scraping or automatic application submission.
- Payments, messaging, or real-time notifications.
- Uploading CVs or other files.
- Sending real email/SMS reminders.
- Real user personal data; only synthetic dummy records will be used.

## Top 3 risks and mitigations
1. **Scope creep:** keep Week 1 CRUD focused on JobApplication and defer auth/follow-up endpoints to Week 2.
2. **Database/tooling setup delays:** use SQLite locally and document exact clean-machine setup steps.
3. **Accidental exposure of secrets or personal data:** use `.env.example`, keep `.env` and the SQLite database out of Git, and seed synthetic data only.


Project Links
GitHub Repository: https://github.com/Catcode-Cynth/applytrail-api/

Postman Collection: https://web.postman.co/workspace/My-Workspace~2e2ca7de-0f37-4102-84bf-2b9c544e2f87/collection/58987073-37244e0e-87df-4358-a534-198510c36361?action=share&source=copy-link&creator=58987073

Google Drive Submission Folder: https://drive.google.com/file/d/1gYLiHGCeFkNV9LOAZ2xUoIuBr54TfXVl/view?usp=sharing


