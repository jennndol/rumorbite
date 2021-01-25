import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignedUser } from '../common/dto/signed-user';
import { compare } from '../common/utils/password';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ILogin } from './auth.interface';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  verifyPassword(plaintext: string, password: string): boolean {
    const isVerified = compare(plaintext, password);
    if (!isVerified) throw new UnauthorizedException();
    return isVerified;
  }

  generateToken(signedUser: SignedUser): string {
    return this.jwtService.sign(signedUser);
  }

  register(registerUserInput: RegisterUserInput): Promise<User> {
    return this.usersService.create(registerUserInput);
  }

  async login(loginUserInput: LoginUserInput): Promise<ILogin> {
    try {
      const { username, password } = loginUserInput;
      const user = await this.usersService.findByEmailOrUsername(username);
      this.verifyPassword(password, user.password);
      const token = this.generateToken({ id: user.id });
      return {
        id: user.id,
        name: user.name,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
