import { MercadoPagoResponse } from "mercadopago/utils/mercadopago-respose";
import { UserI } from "../models/schemas";

export declare global {
  namespace Express {
    interface Request {
      user: UserI;
      mercadopagoResponse: MercadoPagoResponse
    }
  }
}
