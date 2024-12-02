import { DynamicModule, Logger, Module } from '@nestjs/common';
import { RegistryAgentsService } from './registry.service';

@Module({})
export class RegistryAgentsModule {
  static register(): DynamicModule {
    const implementations = RegistryAgentsService.loadModule();

    return {
      module: RegistryAgentsModule,
      providers: [...implementations],
      exports: [...implementations],
    };
  }
}