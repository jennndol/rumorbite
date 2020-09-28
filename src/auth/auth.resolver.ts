import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => User)
  register(@Args('input') registerUserInput: RegisterUserInput): Promise<User> {
    return this.authService.register(registerUserInput);
  }

  @Public()
  @Mutation(() => String)
  login(@Args('input') loginUserInput: LoginUserInput): Promise<string> {
    return this.authService.login(loginUserInput);
  }

}
