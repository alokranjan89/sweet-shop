import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // REGISTER API
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }

  // LOGIN API
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}
