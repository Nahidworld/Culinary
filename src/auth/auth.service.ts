import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    console.log('Validating user with email:', email);  // Add logging
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  
}


// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) {}

//   async validateUser(email: string, password: string) {
//     const user = await this.userService.findByEmail(email);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       return user;
//     }
//     throw new UnauthorizedException('Invalid credentials');
//   }
// }
