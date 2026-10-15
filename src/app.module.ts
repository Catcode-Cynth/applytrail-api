import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ApplicationsModule],
})
export class AppModule {}
