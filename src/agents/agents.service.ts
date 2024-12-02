import { Injectable } from '@nestjs/common';
import { RegistryAgentsService } from './registry/registry.service';

@Injectable()
export class AgentsService {
      
    getAvailableAgents(model: string) {
        console.log(RegistryAgentsService.registry.keys())
        return Array.from(RegistryAgentsService.registry.keys());
      }

}
