import pool from "../../db.js"

export const getProducts = async () => {
    const [rows] = await pool.query(`
        SELECT * FROM products
    `)
    return rows
}

export const getCategories = async () => {
    const [rows] = await pool.query(`
        SELECT DISTINCT category FROM products
    `)

    return rows.map(r => r.category)
}
export const searchProducts = async (q) => {
    const [rows] = await pool.query(`
        SELECT * FROM products
        WHERE title LIKE ?
    `, [`%${q}%`])
    return rows
}

export const getCategoryProducts = async (cat) => {

    const [rows] = await pool.query(`
        SELECT * FROM products
        WHERE category = ?
    `, [cat])
    return rows
}

export const sortProducts = async (sortBy, order) => {
    const dir = order === "desc" ? "DESC" : "ASC"

    const [rows] = await pool.query(`
        SELECT * FROM products
        ORDER BY ${sortBy} ${dir}
    `)

    return rows
}

export const pageProducts = async (limit, skip) => {
    const [rows] = await pool.query(`
        SELECT * FROM products
                          LIMIT ? OFFSET ?
    `, [limit, skip])

    return rows
}