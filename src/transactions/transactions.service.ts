import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { PrismaService } from '../prisma.service.js';

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

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
