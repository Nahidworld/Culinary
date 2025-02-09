import { IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsOptional()
  customerName: string;

  @IsOptional()
  recipeId: number;

  @IsOptional()
  quantity: number;

  @IsOptional()
  status: string;
  
}
