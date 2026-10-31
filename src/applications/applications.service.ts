import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateApplicationDto, userId: number) {
    const { appliedAt, nextFollowUpAt, ...fields } = dto;

    return this.prisma.jobApplication.create({
      data: {
        ...fields,
        ...(appliedAt ? { appliedAt: new Date(appliedAt) } : {}),
        ...(nextFollowUpAt ? { nextFollowUpAt: new Date(nextFollowUpAt) } : {}),
        user: { connect: { id: userId } },
      },
      include: { user: true, followUps: true },
    });
  }

  async findAll(userId: number) {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { user: true, followUps: true },
    });
  }

  async findOne(id: number, userId: number) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: { user: true, followUps: true },
    });

    if (!application) {
      throw new NotFoundException(`Application ${id} was not found`);
    }

    if (application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this application');
    }

    return application;
  }

  async update(id: number, dto: UpdateApplicationDto, userId: number) {
    await this.ensureOwnership(id, userId);

    const { appliedAt, nextFollowUpAt, ...fields } = dto;

    return this.prisma.jobApplication.update({
      where: { id },
      data: {
        ...fields,
        ...(appliedAt ? { appliedAt: new Date(appliedAt) } : {}),
        ...(nextFollowUpAt ? { nextFollowUpAt: new Date(nextFollowUpAt) } : {}),
      },
      include: { user: true, followUps: true },
    });
  }

  async remove(id: number, userId: number) {
    await this.ensureOwnership(id, userId);

    await this.prisma.jobApplication.delete({ where: { id } });
    return { message: `Application ${id} deleted successfully` };
  }

  private async ensureOwnership(id: number, userId: number) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!application) {
      throw new NotFoundException(`Application ${id} was not found`);
    }

    if (application.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this application');
    }
  }
}
