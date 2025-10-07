import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { loginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //post register
  @Post('signup') //sign up
  async signup(@Body () signupData: SignupDto) {
    return this.authService.signup(signupData);
  }
  //post login
  @Post('login')
  async login(@Body() credentials: loginDto) {
    return this.authService.login(credentials);

  //post refresh token
}
}
