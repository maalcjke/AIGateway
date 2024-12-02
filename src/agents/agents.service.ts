import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegistryAgentsService } from './registry/registry.service';
import { Observable } from 'rxjs';
import { Agent } from './interfaces/agent.abstract';
import { UserService } from 'src/user/user.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionType } from 'src/transactions/entities/transaction.entity';
import { IUser } from 'src/types/user.type';

@Injectable()
export class AgentsService {

    constructor(
      private readonly userService: UserService, 
      private readonly transactionsService: TransactionsService
    ) {}
      
    getAvailableAgents() {
        return Array.from(RegistryAgentsService.registry.keys());
    }

    getAgent(name: string) {
        if(!RegistryAgentsService.registry.has(name)) return Error(`Agent ${name} not found/not avaible`);
        return RegistryAgentsService.registry.get(name);
    }

    async getStream(dataUser: IUser, model: string, prompt: string): Promise<Observable<String>> {
      if(!RegistryAgentsService.registry.has(model)) throw new BadRequestException(`Agent ${model} not found/not avaible`);
      const gpt = RegistryAgentsService.registry.get(model) as Agent;

      const user = await this.userService.findOne(dataUser.email);
      if(!user) throw new BadRequestException(`User ${dataUser.email} not found/not avaible`);

      if(user.balance < await gpt.calculateTokenCost(model, prompt)) {
        throw new BadRequestException(`User ${dataUser.email} not have enough balance`);
      } else {         
        await this.transactionsService.create({ 
          amount: await gpt.calculateTokenCost(model, prompt), 
          type: TransactionType.WITHDRAW,
        }, dataUser.id);
      }
      
      return gpt.generateResponse(prompt);
    }
}
