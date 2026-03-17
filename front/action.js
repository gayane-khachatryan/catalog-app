import {renderCategories, renderProducts} from "./dom.js"
import { axios } from "./util/api.js"
import { state } from "./script.js"


export const getProducts = async () => {
    const res = await axios("http://localhost:3051/product/products")
    state.products = res
    renderProducts(res)
}


export const searchProducts = async (q) => {
    const res = await axios(`http://localhost:3051/product/search/${q}`)
    state.products = res
    renderProducts(res)
}
export const getCategories = async () => {
    const res = await axios("http://localhost:3051/product/categories")
    renderCategories(res)
}

export const getCategoryProducts = async (cat) => {
    const res = await axios(`http://localhost:3051/product/category/${cat}`)
    state.products = res
    renderProducts(res)
}






export const sortProducts = async (sortBy, order) => {
    const res = await axios(
        `http://localhost:3051/product/sort?sortBy=${sortBy}&order=${order}`
    )
    state.products = res
    renderProducts(res)
}


export const pageProducts = async () => {
    const res = await axios(
        `http://localhost:3051/product/page?limit=${state.limit}&skip=${state.skip}`
    )

    state.products = res
    renderProducts(res)
}