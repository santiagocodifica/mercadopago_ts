import { RequestHandler } from "express";
import mercadopago from "mercadopago";

const mercadopagoPayment: RequestHandler = async (req, res, next) => {
  const body = req.body
  const payer = req.body.payer
  const paymentData = {
    transaction_amount: Number(body.transaction_amount),
    token: body.token,
    description: body.descriptions,
    installments: Number(body.installments),
    payment_method_id: body.payment_method_id,
    issuer_id: body.issuer_id,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.type,
        number: payer.identification.number
      }
    }
  }

  mercadopago.payment.create(paymentData)
    .then(data => {
      req.mercadopagoResponse = data
      next()
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: "Could not process your payment, check inputs and try again" })
    })
}

export default mercadopagoPayment
