import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '../common/decorators/public.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUserResponse } from './dto/login-user.response';
import { RegisterUserInput } from './dto/register-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  register(@Args('input') registerUserInput: RegisterUserInput): Promise<User> {
    return this.authService.register(registerUserInput);
  }

  @Public()
  @Mutation(() => LoginUserResponse)
  login(
    @Args('input') loginUserInput: LoginUserInput,
  ): Promise<LoginUserResponse> {
    return this.authService.login(loginUserInput);
  }
}
