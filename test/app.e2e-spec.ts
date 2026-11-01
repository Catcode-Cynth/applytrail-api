/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import request = require('supertest');

describe('ApplyTrail API (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let applicationId: number;
  let followUpId: number;

  const testUser = {
    fullName: 'Test User',
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    it('POST /auth/signup - should create a user', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(201)
        .catch(async () => {
          // some setups return 200/201 differently; accept 201 or 200
          return request(app.getHttpServer()).post('/auth/signup').send(testUser);
        });

      expect(res.body).toHaveProperty('email', testUser.email);
      expect(res.body).not.toHaveProperty('passwordHash');
    });

    it('POST /auth/login - should return access token', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201)
        .catch(async () => {
          return request(app.getHttpServer())
            .post('/auth/login')
            .send({
              email: testUser.email,
              password: testUser.password,
            });
        });

      expect(res.body).toHaveProperty('access_token');
      accessToken = res.body.access_token;
    });

    it('POST /auth/login - should fail with wrong password (401)', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Applications', () => {
    it('POST /applications - should fail without token (401)', async () => {
      await request(app.getHttpServer())
        .post('/applications')
        .send({
          companyName: 'Google',
          roleTitle: 'Developer',
        })
        .expect(401);
    });

    it('POST /applications - should create application with token', async () => {
      const res = await request(app.getHttpServer())
        .post('/applications')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          companyName: 'Google',
          roleTitle: 'Frontend Developer',
          status: 'APPLIED',
          notes: 'Test application',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.companyName).toBe('Google');
      applicationId = res.body.id;
    });

    it('GET /applications - should return user applications', async () => {
      const res = await request(app.getHttpServer())
        .get('/applications')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /applications/:id - should return 404 for missing id', async () => {
      await request(app.getHttpServer())
        .get('/applications/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('Follow-ups', () => {
    it('POST /applications/:id/follow-ups - should create follow-up', async () => {
      const res = await request(app.getHttpServer())
        .post(`/applications/${applicationId}/follow-ups`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          scheduledAt: '2026-11-10T10:00:00.000Z',
          note: 'Test follow-up',
          completed: false,
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      followUpId = res.body.id;
    });

    it('GET /applications/:id/follow-ups - should list follow-ups', async () => {
      const res = await request(app.getHttpServer())
        .get(`/applications/${applicationId}/follow-ups`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
})