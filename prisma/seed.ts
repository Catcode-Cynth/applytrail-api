import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.followUp.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.user.deleteMany();

  const demoUser = await prisma.user.create({
    data: { fullName: 'Demo Job Seeker', email: 'demo@example.com' },
  });

  const rows = await Promise.all([
    prisma.jobApplication.create({ data: {
      companyName: 'Acme Labs', roleTitle: 'Junior Backend Developer',
      jobUrl: 'https://example.com/jobs/backend-1', status: 'APPLIED',
      appliedAt: new Date('2026-10-10T09:00:00.000Z'),
      nextFollowUpAt: new Date('2026-10-17T09:00:00.000Z'),
      notes: 'Dummy record for API demonstration.', userId: demoUser.id,
    }}),
    prisma.jobApplication.create({ data: {
      companyName: 'Northstar Digital', roleTitle: 'QA Automation Engineer',
      jobUrl: 'https://example.com/jobs/qa-2', status: 'SCREENING',
      appliedAt: new Date('2026-10-08T10:00:00.000Z'),
      notes: 'Dummy record for API demonstration.', userId: demoUser.id,
    }}),
    prisma.jobApplication.create({ data: {
      companyName: 'Lagos Tech Works', roleTitle: 'Backend Engineering Intern',
      status: 'SAVED',
      notes: 'Saved role; not yet submitted. Dummy data only.', userId: demoUser.id,
    }}),
  ]);

  await prisma.followUp.create({ data: {
    applicationId: rows[0].id,
    scheduledAt: new Date('2026-10-17T09:00:00.000Z'),
    note: 'Check whether an application update is available.',
  }});
  console.log(`Seeded ${rows.length} dummy applications for user ${demoUser.id}.`);
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
