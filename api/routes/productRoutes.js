import express from "express"
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts,  getProductsByCategory, getRecommendedProducts, toggleFeaturedProduct, } from "../controllers/productContoller.js"
import {protectRoute ,adminRoute} from "../middlewares/auth.js"

const router = express.Router()

router.get("/",protectRoute,adminRoute,getAllProducts)

router.get("/reccommendations",getRecommendedProducts)
router.get("/category/:category",getProductsByCategory)
router.get('/featured', getFeaturedProducts);
router.patch('/:id/toggle-featured', toggleFeaturedProduct);
router.post("/",protectRoute,adminRoute,createProduct)
router.delete("/:id",protectRoute,adminRoute,deleteProduct)


export default router