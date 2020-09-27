import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { SignedUser } from "src/common/dto/signed-user";


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
      const signedUser: SignedUser = {
        id: user.id
      }
      const token = this.jwtService.sign(signedUser);
      return token   
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}