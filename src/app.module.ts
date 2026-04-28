import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [BudgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
