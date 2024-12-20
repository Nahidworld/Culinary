import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MENU } from './menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MENU]), // Specific to MENU entity
  ],
  // imports: [
  //     TypeOrmModule.forFeature([MENU]),
  //     TypeOrmModule.forRoot({
  //       type: 'postgres',
  //       host: 'localhost',
  //       port: 5432,
  //       username: 'postgres',
  //       password: 'root',
  //       database: 'test',
  //       entities: [MENU],
  //       synchronize: true,
       
  //     })
  //     // , MenuModule
  //   ],

  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
