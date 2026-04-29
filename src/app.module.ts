import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BudgetsModule } from './budgets/budgets.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BudgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
