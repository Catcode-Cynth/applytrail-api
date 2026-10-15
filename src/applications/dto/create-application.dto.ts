import { ApplicationStatus } from '../application-status.enum';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  roleTitle!: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  jobUrl?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsDateString()
  appliedAt?: string;

  @IsOptional()
  @IsDateString()
  nextFollowUpAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  // Week 1 uses the seeded demo user. Week 2 will derive this from authentication.
  @IsInt()
  @Min(1)
  userId!: number;
}
