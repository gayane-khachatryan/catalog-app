import { getProducts, getCategories } from "./action.js"

export const state = {
    limit: 12,
    skip: 0,
    products: [],
    viewProducts: []
}

document.addEventListener("DOMContentLoaded", () => {
    getProducts()
    getCategories()
})