export interface User {
  id: string;
  email: string;
  name: string;
}

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
