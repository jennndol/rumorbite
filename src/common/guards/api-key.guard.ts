import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if(isPublic) return true;
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    try {
      const decoded = this.jwtService.verify(req.headers.authorization, { secret: this.configService.get('JWT_SECRET') });
      const user = this.usersService.findOne(decoded.id);
      req.user = user;
      return true
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}