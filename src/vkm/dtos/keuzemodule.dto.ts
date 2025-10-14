import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateKeuzemoduleDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  shortdescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  studycredit?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  contact_id?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  learningoutcomes?: string;
}

export class UpdateKeuzemoduleDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsString()
  @IsOptional()
  shortdescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  studycredit?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  contact_id?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  learningoutcomes?: string;
}

export class KeuzemoduleFilterDto {
  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  minStudycredit?: string;

  @IsString()
  @IsOptional()
  search?: string;
}