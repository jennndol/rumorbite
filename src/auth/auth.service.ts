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

  async verifyPassword(plaintext, password){
    const isVerified = await compare(plaintext, password);
    if (!isVerified) throw new UnauthorizedException();
    return isVerified;
  }

  generateToken(signedUser: SignedUser){
    return this.jwtService.sign(signedUser);
  }

  async login(email: string, password: string): Promise < string > {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(password, user.password);
      const token = this.generateToken({id: user.id});
      return token;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}