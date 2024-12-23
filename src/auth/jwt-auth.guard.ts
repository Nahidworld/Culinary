// import { Injectable } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Make sure to import AuthService

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header

    if (!token) {
      return false; // No token provided
    }

    try {
      const user = this.jwtService.verify(token); // Verify the JWT token
      request.user = user; // Attach user to request object for access in route handlers
      return true;
    } catch (e) {
      return false; // Invalid or expired token
    }
  }
}
