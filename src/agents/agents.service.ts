import { Injectable } from '@nestjs/common';
import { RegistryAgentsService } from './registry/registry.service';

@Injectable()
export class AgentsService {
      
    getAvailableAgents() {
        return Array.from(RegistryAgentsService.registry.keys());
    }

    getAgent(name: string) {
        if(!RegistryAgentsService.registry.has(name)) return Error(`Agent ${name} not found/not avaible`);
        return RegistryAgentsService.registry.get(name);
    }

}
