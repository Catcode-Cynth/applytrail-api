import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FollowUpsModule } from './follow-ups/follow-ups.module';

@Module({
  imports: [PrismaModule, ApplicationsModule, AuthModule, FollowUpsModule],
})
export class AppModule {}

