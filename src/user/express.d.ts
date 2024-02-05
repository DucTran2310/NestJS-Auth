// express.d.ts
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any; // Update 'any' with the actual type of your user object if possible
}

export default AuthenticatedRequest;
