import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { RegistryAgentsModule } from './registry/registry.module';
import { UserModule } from 'src/user/user.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [RegistryAgentsModule.register(), TransactionsModule, UserModule],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
