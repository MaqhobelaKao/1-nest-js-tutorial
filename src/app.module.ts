import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HasgtagModule } from './hasgtag/hashtag.module';

@Module({
  imports: [
    UserModule,
    TweetModule,
    AuthModule,
    ProfileModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'nest_js_tutorials',
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'evershop',
      password: 'evershop',
    }),
    HasgtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
