import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { IncomeController } from './income/income.controller';
import { IncomeService } from './income/income.service';
import { IncomeModule } from './income/income.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from './queue/queue.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import session from 'express-session';
import { PassportModule } from '@nestjs/passport';
@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load all entities dynamically
      synchronize: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    MenuModule,RecipeModule, QueueModule, 
    InventoryModule, OrderModule, ReportModule, 
    FeedbackModule, AuthModule, UserModule
  ],

  //imports: [RecipeModule, IncomeModule, MenuModule],
  controllers: [AppController, IncomeController],
  providers: [AppService, IncomeService],
})
// export class AppModule {}
export class AppModule {
  configure(consumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret-key',
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
