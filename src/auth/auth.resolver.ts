import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

@Public()
  @Mutation(() => String)
  loginUser(@Args('input') loginUserInput: LoginUserInput): Promise<string> {
    const {email, password} = loginUserInput;
    return this.authService.login(email, password);
  }

}
