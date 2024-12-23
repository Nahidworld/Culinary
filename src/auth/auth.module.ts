import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
//import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';



@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,  // Import ConfigModule to access environment variables
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Ensures async configuration
      inject: [ConfigService],  // Inject ConfigService to access the environment variables
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // Get JWT secret from environment variable
        signOptions: { expiresIn: '1h' },  // You can adjust the token expiration here
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthGuard,
    JwtStrategy,  // Ensure JwtStrategy is provided for token validation
  ],
  controllers: [AuthController],
  exports: [AuthService],
})

// @Module({
//   imports: [
//     UserModule, 
//     PassportModule,
//     JwtModule.register({
//       secret: 'your-secret-key',  // Replace with your secret key (use environment variable for production)
//       signOptions: { expiresIn: '1h' },  // JWT token expiration (can be adjusted)
//     }),
//   ],
//   providers: [AuthService,
//      LocalStrategy,
//      AuthGuard,
//      JwtStrategy],
//   controllers: [AuthController],
// })
export class AuthModule {}
