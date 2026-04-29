import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { PrismaService } from '../prisma.service.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        name: createTransactionDto.name,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        description: createTransactionDto.description,
        date: createTransactionDto.date
          ? new Date(createTransactionDto.date)
          : new Date(),
        categoryId: createTransactionDto.categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        name: updateTransactionDto.name,
        amount: updateTransactionDto.amount,
        type: updateTransactionDto.type,
        description: updateTransactionDto.description,
        date: updateTransactionDto.date
          ? new Date(updateTransactionDto.date)
          : undefined,
        categoryId: updateTransactionDto.categoryId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
