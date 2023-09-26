import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsModule } from './modules/publications/publications.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    EntitiesModule,
    PublicationsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
