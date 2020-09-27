import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
    }),
    inject: [ConfigService],
  })],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }]
})
export class CommonModule {}
