import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client.js';
import { PrismaService } from '../prisma.service.js';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { FindTransactionsQueryDto } from './dto/find-transactions-query.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        merchant: createTransactionDto.merchant,
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

  findAll(query: FindTransactionsQueryDto) {
    const { categoryId, startDate, endDate } = query;

    const where: Prisma.TransactionWhereInput = {
      ...(categoryId && { categoryId }),
      ...((startDate || endDate) && {
        date: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
      }),
    };

    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { category: true },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        merchant: updateTransactionDto.merchant,
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
