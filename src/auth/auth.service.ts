import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
        private usersService: UsersService,
        private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise < string > {
    try {
      const user = await this.usersService.findByEmail(email);
      const isVerified = await compare(password, user.password);
      if (!isVerified) throw new UnauthorizedException();
      const token = this.jwtService.sign({
        id: user.id
      });
      return token   
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}