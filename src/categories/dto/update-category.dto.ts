import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto.js';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @MinLength(2, { message: 'Category name must be at least 2 characters long' })
  @MaxLength(20, { message: 'Category name is too long' })
  @IsString({ message: 'Category name must be a string' })
  @IsOptional()
  name!: string;

  @MaxLength(50, { message: 'Category icon is too long' })
  @IsString({ message: 'Category icon must be a string' })
  @IsOptional()
  icon!: string;
}
