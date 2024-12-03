import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsModule } from './agents/agents.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule], 
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRESS_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRESS_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            autoLoadEntities: true,
            synchronize: true,
          }), 
          inject: [ConfigService]
      }
    ),
    AgentsModule,
    UserModule, 
    AuthModule,
    TransactionsModule]
})
export class AppModule {}
