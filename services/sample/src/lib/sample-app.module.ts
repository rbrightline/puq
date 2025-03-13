import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample, SampleView } from '@puq/entity';
import { TableNamingStrategy } from '@puq/orm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppEnv, DataSourceEnv } from '@puq/env';
import { SampleModule } from './sample/sample.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({ throttlers: [{ limit: 1000, ttl: 60_000 }] }),
    EventEmitterModule.forRoot({ delimiter: '.' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const appEnv = new AppEnv({ name: 'sample', profile: 'dev' });
        const PROFILE = config.getOrThrow(appEnv.PROFILE);
        const NAME = config.getOrThrow(appEnv.NAME);
        const dbEnv = new DataSourceEnv({ name: NAME, profile: PROFILE });

        return {
          type: 'postgres',
          host: config.getOrThrow<string>(dbEnv.DATABASE_HOST),
          port: config.getOrThrow<number>(dbEnv.DATABASE_PORT),
          username: config.getOrThrow<string>(dbEnv.DATABASE_USERNAME),
          password: config.getOrThrow<string>(dbEnv.DATABASE_PASSWORD),
          database: config.getOrThrow<string>(dbEnv.DATABASE_NAME),
          entities: [Sample, SampleView],
          namingStrategy: new TableNamingStrategy(),
          synchronize: true,
          dropSchema: true,
          poolSize: 50,
          extra: {
            max: 50, // Maximum number of connections in the pool
            min: 4, // Minimum number of connections to keep open
            idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
          },
        };
      },
    }),
    SampleModule,
  ],
})
export class SampleAppModule {}
