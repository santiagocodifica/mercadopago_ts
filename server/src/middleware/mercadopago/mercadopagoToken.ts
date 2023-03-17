import { RequestHandler } from "express";
import mercadopago from "mercadopago";

const mercadopagoToken: RequestHandler = async (_req, res, next) => {
  const mercadoPagoPublicKey = process.env.MERCADO_PAGO_TEST_PUBLIC_KEY;
  if (!mercadoPagoPublicKey) {
    console.log("Error: public key not defined");
    res.status(404).json({ error: "Could not process payment, public key not defined" })
    process.exit(1);
  }

  const mercadoPagoAccessToken = process.env.MERCADO_PAGO_TEST_ACCESS_TOKEN;
  if (!mercadoPagoAccessToken) {
    console.log("Error: access token not defined");
    res.status(404).json({ error: "Could not process payment, access token not defined" })
    process.exit(1);
  }

  mercadopago.configurations.setAccessToken(mercadoPagoAccessToken)

  next()
}

export default mercadopagoToken
