import { Express, Request, NodeJS } from "express";
import { UserI } from "./schemas";

declare global {
  namespace Express {
    interface Request {
      user?: UserI
      mercadopagoResponse?: any
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
    }
  }
}
