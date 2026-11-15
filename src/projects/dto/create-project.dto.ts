import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity.js';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsDateString() 
  @IsOptional()
  deadline?: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}