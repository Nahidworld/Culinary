import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}


