import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([Order]), // Specific to MENU entity
      AuthModule, // Import AuthModule to use AuthService
      UserModule,
     
    ], 
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
