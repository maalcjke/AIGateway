import { Controller, Get, Param, Query, Req, Sse, UseGuards } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { Observable } from 'rxjs';
import { Agent } from './interfaces/agent.abstract';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('models')
@UseGuards(JwtAuthGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  getAvailableAgents() {
    return this.agentsService.getAvailableAgents();
  }
  
  @Sse('stream/:agent')
  sse(@Req() req: any, @Param('agent') agent: string, @Query('prompt') prompt: string): Promise<Observable<String>> {
    return this.agentsService.getStream(req.user, agent, prompt);
  }
}
