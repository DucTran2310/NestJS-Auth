import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
@Controller('auth')
export class AuthController {
  // auth service is automatically created when initializing the controller
  constructor(private authService: AuthService) {
    //do something
  }
  // some requests from client
  @Post('register') //register a new user
  // register(@Req() request: Request) {
  register(@Body('') authDTO: AuthDTO) {
    // authDTO's type must be a "DATA TRANSFER OBJECT" //DTO2037
    // not validate using class-validator AND class-transformer
    // now controller call services
    // we need to validate email and password HERE
    return this.authService.register(authDTO);
  }

  // POST: .../auth/login
  @Post('login') //register a new user
  login(@Body('') authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}
