import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any; // Replace 'any' with the actual type of your user object if possible
}

export default CustomRequest;
