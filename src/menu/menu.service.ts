import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { QUEUE } from 'src/queue/queue.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  private menu = [];

  // In-memory Operations
  addMenu(data: any) {
    this.menu.push(data);
    return { message: 'Menu Item Added', data };
  }

  viewAll() {
    return this.menu;
  }

  findByName(name: string) {
    const item = this.menu.find((menu) => menu.name === name);
    return item || { message: 'Menu Item Not Found' };
  }

  // Database Operations

  // Create a new menu item
  async createMenuItem(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menuItem = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menuItem);
  }

  // Get all menu items
  async getAllMenuItems(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  // Get a specific menu item by ID
  async getMenuItemById(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({ where: { id } });
  }

  // Update a menu item
  async updateMenuItem(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.getMenuItemById(id);
  }

  // Delete a menu item
  async deleteMenuItem(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  //
  async addToDatabase(data: any) {
    const savedItem = await this.menuRepository.save(data);
    return { message: 'Menu Item Added to Database', data: savedItem };
  }

  async getAllFromDatabase() {
    return await this.menuRepository.find();
  }

  async findById(id: number) {
    const item = await this.menuRepository.findOne({ where: { id } });
    if (!item) {
      return { message: 'Menu Item Not Found', id };
    }
    return item;
  }

  async deleteById(id: number) {
    const item = await this.menuRepository.findOne({ where: { id } });
    if (!item) {
      return { message: 'Menu Item Not Found', id };
    }
    await this.menuRepository.delete(id);
    return { message: 'Menu Item Deleted', id };
  }

  async updateById(id: number, data: any) {
    const existingItem = await this.menuRepository.findOne({ where: { id } });
    if (!existingItem) {
      return { message: 'Menu Item Not Found', id };
    }
    const updatedItem = Object.assign(existingItem, data);
    await this.menuRepository.save(updatedItem);
    return { message: 'Menu Item Updated', data: updatedItem };
  }
}


// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { MENU } from './menu.entity';

// @Injectable()
// export class MenuService {
//   constructor(@InjectRepository(MENU)
//    private menuRepository: Repository<MENU>){}

//     private menu = [];
    
//     addMenu(data){
//         this.menu.push(data)
//         return {message: "Menu Inserted", data};
//     }
//     viewAll() {
//         return this.menu;
//     }
//     spec(name){
//         return this.menu.find((title)=>title.name == name) ||
//         {message:"Data not found"}
//     }
    
//     //database:
//     dbAdd(data) {
//         return this.menuRepository.save(data);
//     }
//     get(){
//         return this.menuRepository.find();
//     }
  
//     getid(id){
//         return this.menuRepository.findOne({where:{id}});
//     }
  
//     deleteId(id){
//         return {message:"Menu Deleted" ,id}
//     }
//     async updateId(id,data){
//         const newId = await this.menuRepository.findOne({where:{id}})
//         if(!newId){
//         return "not found";
//         }
//         const s = Object.assign(newId,data)
//         return this.menuRepository.save(s);
//     }

  
// }

