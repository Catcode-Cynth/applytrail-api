import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateApplicationDto) {
    const demoUser = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: { id: true },
    });
    if (!demoUser) throw new NotFoundException(`User ${dto.userId} was not found`);

    const { userId, appliedAt, nextFollowUpAt, ...fields } = dto;
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

  async findAll() {
    return this.prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, followUps: true },
    });
  }

  async findOne(id: number) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: { user: true, followUps: true },
    });
    if (!application) throw new NotFoundException(`Application ${id} was not found`);
    return application;
  }

  async update(id: number, dto: UpdateApplicationDto) {
    await this.ensureExists(id);
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

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.jobApplication.delete({ where: { id } });
    return { message: `Application ${id} deleted successfully` };
  }

  private async ensureExists(id: number) {
    const application = await this.prisma.jobApplication.findUnique({ where: { id }, select: { id: true } });
    if (!application) throw new NotFoundException(`Application ${id} was not found`);
  }
}
