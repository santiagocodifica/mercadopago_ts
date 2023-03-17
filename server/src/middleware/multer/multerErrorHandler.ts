import { NextFunction, Response } from "express";
import multer from "multer";

const multerErrorHandler = (res: Response, next: NextFunction, err: unknown) => {
  if(err instanceof multer.MulterError){
    return res.status(404).json({ error: "Ocurrió un error al procesar la imagen, intenta nuevamente" })
  }else{
    return next()
  }
}
export default multerErrorHandler
