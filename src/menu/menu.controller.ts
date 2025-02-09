import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ) {}

  // In-memory Operations

  // @Post('/add')
  // addMenu(@Body() data: CreateMenuItemDTO) {
  //   return this.menuService.addMenu(data);
  // }

  @Get('/view')
  viewAll() {
    return this.menuService.viewAll();
  }

  @Get('/:name')
  findByName(@Param('name') name: string) {
    return this.menuService.findByName(name);
  }

  // Database Operations

  // Get all menu items (only accessible to authenticated Chef)
  // @UseGuards(JwtAuthGuard)
  //@UseGuards(AuthGuard)
  @Get()
  async getAllMenuItems() {
    return await this.menuService.getAllMenuItems();
  }

   // Get a specific menu item by ID (only accessible to authenticated Chef)
   //@UseGuards(AuthGuard)
  //  @UseGuards(JwtAuthGuard)
   @Get('/:id')
   async getMenuItemById(@Param('id') id: number) {
     return await this.menuService.getMenuItemById(id);
   }
 
   // Create a new menu item (only accessible to authenticated Chef)
   //@UseGuards(AuthGuard)
  //  @UseGuards(JwtAuthGuard)
   @Post()
   async createMenuItem(@Body() createMenuDto: CreateMenuDto) {
     return await this.menuService.createMenuItem(createMenuDto);
   }
 
   // Update an existing menu item (only accessible to authenticated Chef)
   //@UseGuards(AuthGuard)
  //  @UseGuards(JwtAuthGuard)
   @Put(':id')
   async updateMenuItem(@Param('id') id: number, 
    @Body() updateMenuDto: UpdateMenuDto) {
     return await this.menuService.updateMenuItem(id, updateMenuDto);
   }
 
   // Delete a menu item (only accessible to authenticated Chef)
   //@UseGuards(AuthGuard)
  //  @UseGuards(JwtAuthGuard)
   @Delete(':id')
   async deleteMenuItem(@Param('id') id: number) {
     await this.menuService.deleteMenuItem(id);
     return { message: `Menu item with ID ${id} deleted successfully.` };
   }

  // @Post('/db/add')
  // addToDatabase(@Body() data: CreateMenuItemDTO) {
  //   return this.menuService.addToDatabase(data);
  // }

  // @Get('/db/all')
  // getAllFromDatabase() {
  //   return this.menuService.getAllFromDatabase();
  // }

  // @Get('/db/:id')
  // findById(@Param('id') id) {
  //   return this.menuService.findById(id);
  // }

  // @Delete('/db/:id')
  // deleteById(@Param('id') id) {
  //   return this.menuService.deleteById(id);
  // }

  // @Patch('/db/:id')
  // updateById(@Param('id') id, @Body() data: UpdateMenuItemDTO) {
  //   return this.menuService.updateById(id, data);
  // }
}


// import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// import { MenuService } from './menu.service';

// @Controller('menu')
// export class MenuController {
//     constructor(private readonly menuService: MenuService) {} 
    
//         @Post("/add")
//       addRecipe(@Body() data){
//         return this.menuService.addMenu(data)
//       }
    
//       @Get("/view")
//       viewAll() {
//         return this.menuService.viewAll();
//       }
    
//       @Get(':name')
//       spec(@Param('name') name: string) {
//         return this.menuService.spec(name);
//       }
      
//       //database:
//       @Post("/db")
//       dbAdd1(@Body() data)
//       {
//         return this.menuService.dbAdd(data)
//       }
//       //add data
//       @Post("/db/add")
//       dbAdd(@Body() data)
//       {
//         return this.menuService.dbAdd(data)
//       }
//       //view all data
//       @Get("/db/getAll")
//       get()
//       {
//        return this.menuService.get()
//       }
//       //find by id
//       @Get("/db/getAll/:id")
//       getid(@Param('id') id)
//       {
//         return this.menuService.getid(id)
//       }
//       @Delete("/db/getAll/:id")
//       deleteId(@Param('id') id){
//         return this.menuService.deleteId(id);
//       }
//       @Patch("db/getAll/:id")
//       updateId(@Param('id') id, @Body() data){
//         return this.menuService.updateId(id,data)
//       }
// }
