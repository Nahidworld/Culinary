import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RECIPE } from './recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RECIPE]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test',
      entities: [RECIPE],
      synchronize: true,
    }),
    RecipeModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
