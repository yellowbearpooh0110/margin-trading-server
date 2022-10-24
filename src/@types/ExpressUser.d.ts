import { User as DBUser } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends Omit<DBUser, 'password'> {}
  }
}
