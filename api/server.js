import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoDB.js"



import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))


app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/coupons", couponRoutes);
app.use("/api/payments",paymentRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
  });
});