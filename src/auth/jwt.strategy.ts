import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false,
      //secretOrKey: process.env.JWT_SECRET,  // JWT secret from environment
      secretOrKey: configService.get<string>('JWT_SECRET'),  // Access JWT secret from .env
    
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getUserById(payload.id);
  }
  // async validate(payload: any) {
  //   return { userId: payload.id, email: payload.email };  // You can return more info if needed
  // }
}