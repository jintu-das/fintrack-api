import { Controller, Get } from '@nestjs/common';

@Controller('budgets')
export class BudgetsController {
  @Get()
  findAll(): string {
    return 'This action returns all budgets';
  }
}
