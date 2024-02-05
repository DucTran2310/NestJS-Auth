import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import CustomRequest from './custom-request.interface';

export const GetUser = createParamDecorator(
  (
    key: string, //"id", "firstName", "lastName"
    ctx: ExecutionContext,
  ) => {
    //ctx: context
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
