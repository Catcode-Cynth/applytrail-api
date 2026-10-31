import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FollowUpsService } from './follow-ups.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class FollowUpsController {
  constructor(private readonly followUpsService: FollowUpsService) {}

  // Create a follow-up for a specific application
  @Post('applications/:applicationId/follow-ups')
  create(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() dto: CreateFollowUpDto,
    @Request() req,
  ) {
    return this.followUpsService.create(applicationId, dto, req.user.id);
  }

  // List all follow-ups for a specific application
  @Get('applications/:applicationId/follow-ups')
  findAllByApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Request() req,
  ) {
    return this.followUpsService.findAllByApplication(applicationId, req.user.id);
  }

  // Get a single follow-up
  @Get('follow-ups/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.followUpsService.findOne(id, req.user.id);
  }

  // Update a follow-up
  @Patch('follow-ups/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFollowUpDto,
    @Request() req,
  ) {
    return this.followUpsService.update(id, dto, req.user.id);
  }

  // Delete a follow-up
  @Delete('follow-ups/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.followUpsService.remove(id, req.user.id);
  }
}