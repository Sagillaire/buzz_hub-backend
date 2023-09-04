import { Auth, AuthSchema } from './schema/auth.schema';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
