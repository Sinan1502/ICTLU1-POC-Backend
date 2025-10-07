import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //post register
  @Post('signup') //sign up
  async signup(@Body () signupData: SignupDto) {
    return this.authService.signup(signupData);
  }
  //post login

  //post refresh token
}
