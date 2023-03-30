import { RequestHandler } from "express";
import mercadopago from "mercadopago";

const mercadopagoPayment: RequestHandler = async (req, res, next) => {
  const payer = req.body.mercadopagoData.payer
  const mercadopagoData = req.body.mercadopagoData
  const paymentData = {
    transaction_amount: Number(mercadopagoData.transaction_amount),
    token: mercadopagoData.token,
    description: mercadopagoData.description,
    installments: Number(mercadopagoData.installments),
    payment_method_id: mercadopagoData.payment_method_id,
    issuer_id: mercadopagoData.issuer_id,
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
