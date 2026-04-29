import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2, { message: 'Category name must be at least 2 characters long' })
  @MaxLength(20, { message: 'Category name is too long' })
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name is required' })
  name!: string;
}
