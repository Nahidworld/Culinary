import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

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


// import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, MaxLength } from 'class-validator';

// export class CreateMenuItemDTO {
//   @IsString()
//   @IsNotEmpty({ message: 'Name is required.' })
//   @MaxLength(100, { message: 'Name cannot exceed 100 characters.' })
//   name: string;

//   @IsString()
//   @IsOptional()
//   @MaxLength(500, { message: 'Description cannot exceed 500 characters.' })
//   description?: string;

//   @IsNumber()
//   @IsNotEmpty({ message: 'Price is required.' })
//   @Min(0, { message: 'Price must be a positive value.' })
//   price: number;

//   @IsString()
//   @IsNotEmpty({ message: 'Category is required.' })
//   @MaxLength(50, { message: 'Category cannot exceed 50 characters.' })
//   category: string;
// }

// export class UpdateMenuItemDTO {
//   @IsString()
//   @IsOptional()
//   @MaxLength(100, { message: 'Name cannot exceed 100 characters.' })
//   name?: string;

//   @IsString()
//   @IsOptional()
//   @MaxLength(500, { message: 'Description cannot exceed 500 characters.' })
//   description?: string;

//   @IsNumber()
//   @IsOptional()
//   @Min(0, { message: 'Price must be a positive value.' })
//   price?: number;

//   @IsString()
//   @IsOptional()
//   @MaxLength(50, { message: 'Category cannot exceed 50 characters.' })
//   category?: string;
// }

// export class MenuQueryDTO {
//   @IsString()
//   @IsOptional()
//   @MaxLength(100, { message: 'Search term cannot exceed 100 characters.' })
//   search?: string;

//   @IsString()
//   @IsOptional()
//   category?: string;

//   @IsNumber()
//   @IsOptional()
//   @Min(0, { message: 'Minimum price must be a positive value.' })
//   minPrice?: number;

//   @IsNumber()
//   @IsOptional()
//   @Min(0, { message: 'Maximum price must be a positive value.' })
//   maxPrice?: number;
// }
