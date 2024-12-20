import {Controller,Post,UseGuards,Request,Body,Session,} from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { UserService } from '../user/user.service';
  import { UserRegisterDto, UserLoginDto } from '../user/user.dto';
import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {}
    
    @Post('register')
    async register(@Body() registerDto: UserRegisterDto) {
      //return this.userService.registerUser(registerDto);
      try {
        const user = await this.userService.registerUser(registerDto);
        return { message: 'Registration successful', user };
      } catch (error) {
        return { message: 'Error during registration', error: error.message };
      }
    }
  
    
    @Post('login')
    @UseGuards(AuthGuard)
    login(@Request() req, @Session() session: Record<string, any>) {
        if (req.user) {
            session.user = req.user;  // Store user data in session
            console.log('User logged in:', req.user);  // Debugging
            return { message: 'Login successful', user: req.user };
        } else {
            return { message: 'Login failed' };
        }
    }
    // @Post('login')
    // @UseGuards(AuthGuard)
    // login(@Request() req, @Session() session: Record<string, any>) {
    //   session.user = req.user; //store data in session
    //   return { message: 'Login successful', user: req.user };
    // }


  
    @Post('logout')
    logout(@Session() session: Record<string, any>) {
      session.destroy();//destroy sesso=ion
      return { message: 'Logout successful' };
    }
  }
  