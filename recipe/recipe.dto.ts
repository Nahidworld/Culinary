import { IsNotEmpty } from "class-validator";


export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;
    ingredients: string[];
    instructions: string;
}

export class UpdateRecipeDto {
    title?: string;
    ingredients?: string[];
    instructions?: string;
}
  
  