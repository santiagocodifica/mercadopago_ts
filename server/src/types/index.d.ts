import { UserI } from "../models/schemas";

export declare global {
  namespace Express {
    interface Request {
      user: UserI;
    }
  }
}
