import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req) {
    return this.applicationsService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
@Get()
findAll(
  @Request() req,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
) {
  const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
  const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);

  return this.applicationsService.findAll(req.user.id, pageNumber, limitNumber);
}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.applicationsService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateApplicationDto,
    @Request() req,
  ) {
    return this.applicationsService.update(id, dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.applicationsService.remove(id, req.user.id);
  }
}