import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    console.log('Finding user with email:', email);
    return this.userRepository.findOne({ where: { email } }) ?? null;
  }
  // //registration of user linked auth
  // async registerUser(registerDto: UserRegisterDto): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  //   const user = this.userRepository.create({
  //     ...registerDto,
  //     password: hashedPassword,
  //   });
  //   return this.userRepository.save(user);
  // }

  ////============working=====
  // Registration of user linked to auth
  async registerUser(registerDto: UserRegisterDto): Promise<User> {
    //check existing user
    const existingUser = await this.findByEmail(registerDto.email);

    if (existingUser) {
      console.error('Registration failed: Email already exists');
      throw new UnauthorizedException('Email is already in use');
    }
    console.log('Registering new user:', registerDto.email);

    //create user
    try {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }catch (error) {
    console.error('Error hashing password:', error);
    throw new InternalServerErrorException('Failed to register user');
  }}

  // Validates user credentials for login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) {
      console.error('Login failed: Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Login failed: Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log('Login successful for user:', user.email);
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   console.error('Login failed: Invalid email or password');
    //   throw new UnauthorizedException('Invalid email or password');
    // }
    // console.log('Login successful for user:', user.email);
    // const { password: _, ...userWithoutPassword } = user;
    // return userWithoutPassword;

  }

  async create(name: string, email: string, password: string) {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }


  // Fetch user by ID
  async getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
  // async getUserById(id: string): Promise<User> {
  //   if (!id || isNaN(Number(id))) {
  //     throw new BadRequestException('Invalid user ID');
  //   }
  //   // console.log('Fetching user with ID:', id);
  //   // const user = await this.userRepository.findOne({ where: { id } });
  //   console.log('Fetching user with ID:', id);
  //   const user = await this.userRepository.findOne({ where: { id } });

  //   if (!user) {
  //     console.error('User not found with ID:', id);
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   return user;
  // }

  ////============working=====

}
