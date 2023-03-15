import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import productRoutes from "./routes/product"
import userRoutes from "./routes/user"
import orderRoutes from "./routes/order"

const app = express()

app.use(express.json())
app.use((req, _res, next) => {
  console.log(req.path, req.method)
  next()
})

//api routes
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/order", orderRoutes)

//mongoDB connection
mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening to port " + process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error);
  })
