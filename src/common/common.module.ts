import { Module } from '@nestjs/common';
import provider from './configs/provider';
import { BcryptEncrypter } from './adapters/bcrypt-encrypter';
import { JwtAuthToken } from './adapters/jwt-auth-token';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          global: true,
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [
    {
      provide: provider.ENCRYPTER,
      useClass: BcryptEncrypter,
    },
    {
      provide: provider.AUTH_TOKEN,
      useClass: JwtAuthToken,
    },
  ],
  exports: [
    {
      provide: provider.ENCRYPTER,
      useClass: BcryptEncrypter,
    },
    {
      provide: provider.AUTH_TOKEN,
      useClass: JwtAuthToken,
    },
  ],
})
export class CommonModule {}
