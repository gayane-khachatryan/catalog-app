import {
    getProducts, searchProducts, getCategoryProducts, sortProducts, pageProducts,getCategories} from "../models/productModel.js"


export const products = async (req, res) => {
    const data = await getProducts()
    res.json(data)
}
export const categories = async (req, res) => {
    const data = await getCategories()
    res.json(data)
}



export const search = async (req, res) => {
    const data = await searchProducts(req.params.q)
    res.json(data)
}


export const category = async (req, res) => {
    const data = await getCategoryProducts(req.params.name)
    res.json(data)
}


export const sort = async (req, res) => {
    const { sortBy, order } = req.query
    const data = await sortProducts(sortBy, order)
    res.json(data)
}


export const page = async (req, res) => {
    const limit = +(req.query.limit || 12)
    const skip = +(req.query.skip || 0)

    const data = await pageProducts(limit, skip)

    res.json(data)
}