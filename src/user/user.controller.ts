

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Session,
    Request,
  } from '@nestjs/common';
  import { AuthGuard } from '../auth/auth.guard';
  import { UserService } from './user.service';
  import { UserRegisterDto, UserLoginDto } from './user.dto';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post('register')
    async register(@Body() registerDto: UserRegisterDto) {
      return this.userService.registerUser(registerDto);
    }
  
    @Post('login')
    async login(
      @Body() loginDto: UserLoginDto,
      @Session() session: Record<string, any>,
      @Request() req
    ) {
      const user = await this.userService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      session.user = user;
      return { message: 'Login successful', user };
    }
  
    @Post('logout')
    async logout(@Session() session: Record<string, any>) {
      session.destroy();
      return { message: 'Logout successful' };
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Session() session: Record<string, any>) {
      if (!session.user) {
        return { message: 'Not logged in' };
      }
      return session.user;
    }
  
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
      return this.userService.getUserById(+id);
    }
  }
  