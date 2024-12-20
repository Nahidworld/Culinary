import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Post("/add")
  addRecipe(@Body() data){
    return this.recipeService.addRecipe(data)
  }

  @Get("/view")
  viewAll() {
    return this.recipeService.viewAll();
  }

  @Get(':name')
  spec(@Param('name') name: string) {
    return this.recipeService.spec(name);
  }
  
  //database:
  //add data
  @Post("/db/add")
  dbAdd(@Body() data)
  {
    return this.recipeService.dbAdd(data)
  }
  //view all data
  @Get("/db/getAll")
  get()
  {
   return this.recipeService.get()
  }
  //find by id
  @Get("/db/getAll/:id")
  getid(@Param('id') id)
  {
    return this.recipeService.getid(id)
  }
  @Delete("/db/getAll/:id")
  deleteId(@Param('id') id){
    return this.recipeService.deleteId(id);
  }
  @Patch("db/getAll/:id")
  updateId(@Param('id') id, @Body() data){
    return this.recipeService.updateId(id,data)
  }

  


}
