import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { Category } from '../generated/prisma/client.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  // findOne(id: string) {
  //   return this.prisma.category.findUnique({
  //     where: { id },
  //   });
  // }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
