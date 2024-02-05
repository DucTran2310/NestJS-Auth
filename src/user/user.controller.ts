// user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
    // Now we create a "custom" guard
  }
}
