import {MiddlewareConsumer, Module,NestModule } from '@nestjs/common';
import { UsersService } from './service/users.service';

import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './constant/jwt.constant';
import { AuthMiddleware } from './middleware/user.middleware';
import { JwtService } from './service/jwt.service';
import { AuthService } from './service/auth.service';
import { DataSchema } from './schema/data.schema';
import { DataService } from './service/data.service';




@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Antier:Antier123@antier.jvklgyk.mongodb.net/hackathon?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{name:"Data",schema:DataSchema}]),
    MulterModule.register({ dest: './uploads' }),
    
   
  

  ],
  
  controllers: [UsersController],
  providers: [DataService,UsersService,JwtService,AuthService],
  exports: [DataService,UsersService,JwtService],
})


export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes("users/:id/purchase");
  }
}

