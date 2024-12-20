import { Injectable } from '@nestjs/common';
import { CreateRecipeDto, UpdateRecipeDto } from './recipe.dto';
import { data } from 'src/income/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RECIPE } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(RECIPE)
   private recipeRepository: Repository<RECIPE>){}
    
  private recipes = [];
  getHello(): string {
    return 'Hello World!';
  }

  addRecipe(data){
    // const newRecipe = { id: this.recipes.length + 1, ...createRecipeDto };
    //this.recipes.push(newRecipe);
    this.recipes.push(data)
    //return newRecipe;
    return {message: "Recipe Inserted", data};
  }

  viewAll() {
    return this.recipes;
  }
  spec(name){
    return this.recipes.find((title)=>title.name == name) ||
    {message:"Data not found"}
  }


  //database:
  dbAdd(data) {
    return this.recipeRepository.save(data);
  }
  get(){
    return this.recipeRepository.find();
  }
  
  getid(id){
    return this.recipeRepository.findOne({where:{id}});
  }
  
  deleteId(id){
    //return this.recipeRepository.delete(id);
    return {message:"Recipe Deleted"}
  }
  async updateId(id,data){
    const newId = await this.recipeRepository.findOne({where:{id}})
    if(!newId){
      return "not found";
    }
    const s = Object.assign(newId,data)
    return this.recipeRepository.save(s);
  }

  
}





