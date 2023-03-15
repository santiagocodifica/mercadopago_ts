import { NextFunction, Response } from "express";
import multer from "multer";

const multerErrorHandler = (res: Response, next: NextFunction, err: any) => {
  if(err instanceof multer.MulterError){
    return res.status(404).json({ error: "Ocurrió un error al procesar la imagen, intenta nuevamente" })
  }
  return next()
}
export default multerErrorHandler
