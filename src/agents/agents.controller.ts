import { Controller, Get, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  getAvailableAgents(@Query('model') model: string) {
    return this.agentsService.getAvailableAgents(model);
  }
}
