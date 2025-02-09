// src/auth/dto/auth.dto.ts
export class RegisterDto {
  name: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

// import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// export class RegisterDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   @MinLength(6)
//   password: string;
// }

// export class LoginDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }



// export class RegisterDto {
//     name: string;
//     email: string;
//     password: string;
//   }
  
//   export class LoginDto {
//     email: string;
//     password: string;
//   }