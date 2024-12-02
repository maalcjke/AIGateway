import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { RegistryAgentsService } from './registry.service';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class RegistryAgentsModule implements OnModuleInit  {
  
  onModuleInit(): DynamicModule {
    const implementations = RegistryAgentsService.loadModule();
    
    return {
      imports: [ConfigModule],
      module: RegistryAgentsModule,
      providers: [...implementations],
      exports: [...implementations],
    };
  }
}