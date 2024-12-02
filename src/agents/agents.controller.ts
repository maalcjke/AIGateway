import { Controller, Get, Param, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  getAvailableAgents() {
    return this.agentsService.getAvailableAgents();
  }

  @Get(':agent')
  getAgent(@Param('agent') agent: string) {
    return this.agentsService.getAgent(agent);
  }
}
