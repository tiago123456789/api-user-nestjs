import { Module } from '@nestjs/common';
import provider from './configs/provider';
import { BcryptEncrypter } from './adapters/bcrypt-encrypter';
import { JwtAuthToken } from './adapters/jwt-auth-token';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NestMailer } from './adapters/nest-mailer';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    MailerModule.forRootAsync({
      useFactory() {
        return {
          transport: {
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: '32e29435b6d190',
              pass: '92c9d71f3c77d9',
            },
          },
          template: {
            dir: __dirname + '../../../../views',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
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
    {
      provide: provider.MAILER,
      useClass: NestMailer,
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
    {
      provide: provider.MAILER,
      useClass: NestMailer,
    },
  ],
})
export class CommonModule {}
