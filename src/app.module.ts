import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TweetModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [],
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        database: 'nest_js_tutorials',
        entities: [],
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'evershop',
        password: 'evershop',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
