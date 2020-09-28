import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { SignedUser } from "src/common/dto/signed-user";
import { User } from "src/users/entities/user.entity";
import { RegisterUserInput } from "./dto/register-user.input";
import { LoginUserInput } from "./dto/login-user.input";


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

  register(registerUserInput: RegisterUserInput): Promise<User> {
    return this.usersService.create(registerUserInput);
  }

  async login(loginUserInput: LoginUserInput): Promise < string > {
    try {
      const { username, password } = loginUserInput;
      const user = await this.usersService.findByEmailOrUsername(username);
      await this.verifyPassword(password, user.password);
      const token = this.generateToken({id: user.id});
      return token;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}