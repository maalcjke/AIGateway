import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { RegistryAgentsModule } from './registry/registry.module';

@Module({
  imports: [RegistryAgentsModule.register()],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
