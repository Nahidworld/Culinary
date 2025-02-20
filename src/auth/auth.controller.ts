// src/auth/auth.controller.ts
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  // @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  // @UseGuards(AuthGuard('jwt'))
  async logout(@Request() req) {
    return { message: 'Logged out successfully' };
  }
}

// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterDto, LoginDto } from './dto/auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   @Post('login')
//   login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }



// import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { RegisterDto, LoginDto } from './dto/auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   // @Post('login')
//   // @UseGuards(AuthGuard('local'))
//   // async login(@Body() loginDto: LoginDto) {
//   //   return this.authService.login(loginDto);
//   // }

//   @Post('login')
//   @UseGuards(AuthGuard('local'))
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
//   @Get('me')
//   @UseGuards(AuthGuard('jwt'))
//   async getProfile(@Request() req) {
//     return req.user;
//   }

//   // @Post('logout')
//   // @UseGuards(AuthGuard('jwt'))
//   // async logout(@Request() req) {
//   //   return { message: 'Logged out successfully' };
//   // }
//   @Post('logout')
//   @UseGuards(AuthGuard('jwt'))
//   async logout() {
//     return { message: 'Logged out successfully' };
//   }

// }

// // import {Controller,Post,UseGuards,Request,Body,Session,} from '@nestjs/common';
// //   import { AuthGuard } from './auth.guard';
// //   import { UserService } from '../user/user.service';
// //   import { UserRegisterDto, UserLoginDto } from '../user/user.dto';
// //   import { AuthService } from './auth.service';
// // import { JwtService } from '@nestjs/jwt';
  
// //   @Controller('auth')
// //   export class AuthController {
// //     constructor(
// //         private readonly authService: AuthService,
// //         private readonly userService: UserService,
// //         private readonly jwtService: JwtService,
// //       ) {}
    
// //     @Post('register')
// //     async register(@Body() registerDto: UserRegisterDto) {
// //       //return this.userService.registerUser(registerDto);
// //       try {
// //         const user = await this.userService.registerUser(registerDto);
// //         return { message: 'Registration successful', user };
// //       } catch (error) {
// //         return { message: 'Error during registration', error: error.message };
// //       }
// //     }
  
// //     @Post('login')
// //     async login(
// //     @Body() loginDto: UserLoginDto,
// //     @Session() session: Record<string, any>,
// //     @Request() req
// //   ) {
// //     // Validate the user's credentials
// //     const user = await this.userService.validateUser(
// //       loginDto.email,
// //       loginDto.password,
// //     );

// //     // Generate JWT token
// //     const token = this.jwtService.sign({ id: user.id, email: user.email });

// //     // Store user and JWT token in the session
// //     session.user = user;
// //     session.token = token;  // Add the JWT token to the session

// //     return { message: 'Login successful', user, token };  // Return token along with user data
// //   }

// //   //this is working below
// //   //   // Login an existing user
// //   // @Post('login')
// //   // async login(
// //   //   @Body() loginDto: UserLoginDto,
// //   //   @Session() session: Record<string, any>,
// //   // ) {
// //   //   try {
// //   //     const user = await this.userService.validateUser(
// //   //       loginDto.email,
// //   //       loginDto.password,
// //   //     );
// //   //     session.user = user; // Store user in session
// //   //     console.log('User logged in:', user); // Debugging
// //   //     return { message: 'Login successful', user };
// //   //   } catch (error) {
// //   //     console.error('Login error:', error.message); // Debugging
// //   //     return { message: 'Login failed', error: error.message };
// //   //   }
// //   // }
    
// //     // @UseGuards(AuthGuard)
// //     // @Post('login')
// //     // login(@Request() req, @Session() session: Record<string, any>) {
// //     //   console.log('Request user:', req.user);  // Check the request object
// //     //   session.user = req.user;
// //     //   return { message: 'Login successful', user: req.user }; 
// //     //   // if (req.user) {
// //     //     //     session.user = req.user;  // Store user data in session
// //     //     //     console.log('User logged in:', req.user);  // Debugging
// //     //     //     return { message: 'Login successful', user: req.user };
// //     //     // } else {
// //     //     //     return { message: 'Login failed' };
// //     //     // }
// //     // }
// //     // @Post('login')
// //     // @UseGuards(AuthGuard)
// //     // login(@Request() req, @Session() session: Record<string, any>) {
// //     //   session.user = req.user; //store data in session
// //     //   return { message: 'Login successful', user: req.user };
// //     // }


// //     @Post('logout')
// //     logout(@Session() session: Record<string, any>) {
// //       session.destroy();//destroy sesso=ion
// //       return { message: 'Logout successful' };
// //     }
// //   }
  