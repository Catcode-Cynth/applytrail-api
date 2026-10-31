import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Injectable()
export class FollowUpsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(applicationId: number, dto: CreateFollowUpDto, userId: number) {
    await this.ensureApplicationOwnership(applicationId, userId);

    return this.prisma.followUp.create({
      data: {
        scheduledAt: new Date(dto.scheduledAt),
        note: dto.note,
        completed: dto.completed ?? false,
        application: { connect: { id: applicationId } },
      },
      include: { application: true },
    });
  }

  async findAllByApplication(applicationId: number, userId: number) {
    await this.ensureApplicationOwnership(applicationId, userId);

    return this.prisma.followUp.findMany({
      where: { applicationId },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async findOne(id: number, userId: number) {
    const followUp = await this.prisma.followUp.findUnique({
      where: { id },
      include: { application: true },
    });

    if (!followUp) {
      throw new NotFoundException(`Follow-up ${id} was not found`);
    }

    if (followUp.application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this follow-up');
    }

    return followUp;
  }

  async update(id: number, dto: UpdateFollowUpDto, userId: number) {
    await this.ensureFollowUpOwnership(id, userId);

    return this.prisma.followUp.update({
      where: { id },
      data: {
        ...(dto.scheduledAt ? { scheduledAt: new Date(dto.scheduledAt) } : {}),
        ...(dto.note !== undefined ? { note: dto.note } : {}),
        ...(dto.completed !== undefined ? { completed: dto.completed } : {}),
      },
      include: { application: true },
    });
  }

  async remove(id: number, userId: number) {
    await this.ensureFollowUpOwnership(id, userId);

    await this.prisma.followUp.delete({ where: { id } });
    return { message: `Follow-up ${id} deleted successfully` };
  }

  private async ensureApplicationOwnership(applicationId: number, userId: number) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      select: { id: true, userId: true },
    });

    if (!application) {
      throw new NotFoundException(`Application ${applicationId} was not found`);
    }

    if (application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this application');
    }
  }

  private async ensureFollowUpOwnership(id: number, userId: number) {
    const followUp = await this.prisma.followUp.findUnique({
      where: { id },
      include: { application: { select: { userId: true } } },
    });

    if (!followUp) {
      throw new NotFoundException(`Follow-up ${id} was not found`);
    }

    if (followUp.application.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this follow-up');
    }
  }
}