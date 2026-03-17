import { Router } from "express"
import { products, search, category, sort, page,categories } from "../controller/productController.js"

const router = Router()



router.get("/products", products)
router.get("/search/:q", search)
router.get("/categories", categories)
router.get("/category/:name", category)
router.get("/sort", sort)
router.get("/page", page)

export default router