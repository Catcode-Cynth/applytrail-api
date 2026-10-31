import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFollowUpDto {
  @IsDateString()
  scheduledAt!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  note!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}