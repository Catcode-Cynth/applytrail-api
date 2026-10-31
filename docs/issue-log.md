# ApplyTrail API – Week 2 Issue Log

### Issue #1 – Dependency version conflict with @nestjs/passport
**Description:** Installing the latest `@nestjs/passport` failed because the project uses NestJS v10, while the latest package required NestJS v11/v12.  
**Options considered:** Upgrade entire NestJS version, or install compatible v10 packages.  
**Decision & fix:** Installed `@nestjs/jwt@10` and `@nestjs/passport@10` to match the existing NestJS version. Problem resolved.

### Issue #2 – Prisma Client out of date after adding passwordHash
**Description:** TypeScript reported that `passwordHash` and `role` did not exist on the User type even though they were in the schema.  
**Options considered:** Restart editor only, or regenerate Prisma Client.  
**Decision & fix:** Ran `npx prisma generate` and restarted the TypeScript server. Types updated correctly.

### Issue #3 – Database column passwordHash missing
**Description:** Runtime error: `The column main.User.passwordHash does not exist in the current database` even though the schema contained the field.  
**Options considered:** Manual SQL alteration, new migration, or `db push`.  
**Decision & fix:** Used `npx prisma db push` followed by `npx prisma generate` and re-seeded the database. Column was created successfully.

### Issue #4 – Seed file failed after adding required passwordHash
**Description:** The seed script tried to create a User without `passwordHash`, causing a Prisma error.  
**Options considered:** Make the field optional, or update the seed to hash a password.  
**Decision & fix:** Updated `prisma/seed.ts` to hash a demo password with bcrypt before creating the user.

### Issue #5 – 403 Forbidden on Application and Follow-up routes
**Description:** Requests returned 403 even with a valid JWT token.  
**Options considered:** Bug in the guard, or ownership mismatch.  
**Decision & fix:** Confirmed ownership checks were working correctly. The IDs being tested belonged to the old seeded demo user. Fixed by creating new records with the currently authenticated user and using those IDs.

### Issue #6 – Incorrect Follow-up URL causing 404
**Description:** Create Follow-up returned `Cannot POST /auth/signup/applications/1/follow-ups`.  
**Options considered:** Route registration bug vs wrong client URL.  
**Decision & fix:** The client was calling the wrong path. Corrected the URL to `POST /applications/:applicationId/follow-ups`. Routes worked as expected.
