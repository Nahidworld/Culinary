// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user || !(await user.comparePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }
  // async validateUser(payload: any) {
  //   return await this.userRepository.findOne({ where: { id: payload.sub } });
  // }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { RegisterDto, LoginDto } from './dto/auth.dto';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/user/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//     private jwtService: JwtService,
//   ) {}

//   async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const user = this.userRepository.create({ ...registerDto, password: hashedPassword });
//     await this.userRepository.save(user);
//     return this.generateToken(user);
//   }

//   async login(loginDto: LoginDto): Promise<{ access_token: string }> {
//     const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
//     if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     return this.generateToken(user);
//   }

//   private generateToken(user: User): { access_token: string } {
//     return { access_token: this.jwtService.sign({ sub: user.id, email: user.email }) };
//   }
// }



// // import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
// // import { JwtService } from '@nestjs/jwt';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository } from 'typeorm';
// // import { User } from '../user/user.entity';
// // import { RegisterDto, LoginDto } from './dto/auth.dto';
// // import { UserService } from 'src/user/user.service';
// // import * as bcrypt from "bcrypt"

// // @Injectable()
// // export class AuthService {
// //   constructor(
// //     @InjectRepository(User)
// //     private readonly userRepository: Repository<User>,
// //     private readonly jwtService: JwtService,
// //     private userService: UserService,
// //   ) {}

// //   async register(registerDto: RegisterDto) {
// //     const { email } = registerDto;
// //     // Check if user already exists
// //     const existingUser = await this.userRepository.findOne({ where: { email } });
// //     if (existingUser) {
// //       throw new ConflictException('User with this email already exists');
// //     }

// //     // Create and save the user
// //     const user = this.userRepository.create(registerDto);
// //     await this.userRepository.save(user);

// //     // Generate JWT token
// //     const payload = { sub: user.id, email: user.email };
// //     const access_token = this.jwtService.sign(payload);
// //     return { access_token, user };
// //     //return this.generateToken(user);
// //   }
// //   // async register(name: string, email: string, password: string) {
// //   //   const hashedPassword = await bcrypt.hash(password, 10)
// //   //   // const user = await this.userService.registerUser(name, email, hashedPassword)
// //   //   const user = this.userRepository.create({ name, email, password: hashedPassword })
// //   //   const token = this.jwtService.sign({ userId: user.id })
// //   //   return { user, token }
// //   // }

// //   // async login(user: User) {
// //   //   const payload = { sub: user.id, email: user.email };
// //   //   const access_token = this.jwtService.sign(payload);
// //   //   return { access_token, user };
// //   // }
// //   async login(user: User) {
// //     const payload = { sub: user.id, email: user.email };
// //     return {
// //       access_token: this.jwtService.sign(payload), // Uses the JWT secret
// //     };
// //   }

// //   //login without payload
// //   // async login(loginDto: LoginDto) {
// //   //   const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
// //   //   if (!user || !(await user.comparePassword(loginDto.password))) {
// //   //     throw new UnauthorizedException('Invalid credentials');
// //   //   }
// //   //   return this.generateToken(user);
// //   // }

// //   private generateToken(user: User) {
// //     const payload = { sub: user.id, email: user.email };
// //     return {
// //       access_token: this.jwtService.sign(payload),
// //     };
// //   }

// //   async validateUser(email: string, password: string) {
// //     const user = await this.userRepository.findOne({ where: { email } });
// //     if (user && (await user.comparePassword(password))) {
// //       return user;
// //     }
// //     return null;
// //   }
// //   async validateUserById(userId: string) {
// //     return this.userRepository.findOne({ where: { id: userId } });
// //   }
// //   // async validateUser(email: string, password: string) {
// //   //   const user = await this.userRepository.findOne({ where: { email } });
// //   //   if (user && (await bcrypt.compare(password, user.password))) {
// //   //     return user;
// //   //   }
// //   //   throw new UnauthorizedException('Invalid credentials');
// //   // }

// //   // async validateUser(payload: any, password: string) {
// //   //   return await this.userRepository.findOne({ where: { id: payload.sub } });
// //   // }


// // }

// // // import { Injectable, UnauthorizedException } from '@nestjs/common';
// // // import { UserService } from '../user/user.service';
// // // import * as bcrypt from 'bcrypt';

// // // @Injectable()
// // // export class AuthService {
// // //   constructor(private readonly userService: UserService) {}

// // //   async validateUser(email: string, password: string) {
// // //     console.log('Validating user with email:', email);  // Add logging
// // //     const user = await this.userService.findByEmail(email);
// // //     if (user && (await bcrypt.compare(password, user.password))) {
// // //       return user;
// // //     }
// // //     throw new UnauthorizedException('Invalid credentials');
// // //   }
  
// // // }


// // // // import { Injectable, UnauthorizedException } from '@nestjs/common';
// // // // import { UserService } from '../user/user.service';
// // // // import * as bcrypt from 'bcrypt';

// // // // @Injectable()
// // // // export class AuthService {
// // // //   constructor(private readonly userService: UserService) {}

// // // //   async validateUser(email: string, password: string) {
// // // //     const user = await this.userService.findByEmail(email);
// // // //     if (user && (await bcrypt.compare(password, user.password))) {
// // // //       return user;
// // // //     }
// // // //     throw new UnauthorizedException('Invalid credentials');
// // // //   }
// // // // }
