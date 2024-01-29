import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  // auth service is automatically created when initializing the controller
  constructor(private authService: AuthService) {
    //do something
  }
  // some requests from client
  @Post('register') //register a new user
  register() {
    // now controller call services
    return this.authService.register();
  }

  // POST: .../auth/login
  @Post('login') //register a new user
  login() {
    return this.authService.login();
  }
}
