import { searchProducts, getCategoryProducts, pageProducts, getProducts, sortProducts } from "./action.js"
import { state } from "./script.js"





const $ = s => document.querySelector(s)

function openModal(p) {

    $("#modalHead").textContent = `#${p.id} • ${p.category}`
    $("#mTitle").textContent = p.title
    $("#mDesc").textContent = p.description
    $("#mPrice").textContent = `$${p.price}`
    $("#mStock").textContent = `stock: ${p.stock}`
    $("#modalImg").innerHTML = `<img src="${p.thumbnail}" alt="${p.title}">`
    $("#mPills").innerHTML = `<span class="pill">${p.category}</span>`
    $("#modal").classList.add("open")
}

function closeModal() {
    $("#modal").classList.remove("open")
}

export function renderCategories(categories) {
    $("#catList").innerHTML = `
        <div class="cat active" data-cat="all">
            <span class="name">All</span>
        </div>

        ${categories.map(cat => `
            <div class="cat" data-cat="${cat}">
                <span class="name">${cat}</span>
            </div>
        `).join("")}
    `
}

export function renderProducts(products) {

    state.viewProducts = products

    $("#cards").innerHTML = products.map((p, i) => `
        <div class="card" data-i="${i}">
            <div class="thumb">
                <img src="${p.thumbnail}" alt="${p.title}">
            </div>

            <div class="body">
                <div class="title">${p.title}</div>
                <div class="desc">${p.description}</div>

                <div class="row">
                    <div class="price">$${p.price}</div>
                    <div class="mini">${p.category}</div>
                </div>
            </div>
        </div>
    `).join("")
}

function onCategoryClick(e) {
    const el = e.target.closest("[data-cat]")
    if (!el) return

    document.querySelector(".cat.active")?.classList.remove("active")
    el.classList.add("active")

    const cat = el.dataset.cat
    state.skip = 0

    $("#activeCatBadge").textContent = cat === "all" ? "All" : cat

    if (cat === "all") {
        getProducts()
        return
    }

    getCategoryProducts(cat)
}

function onSearchInput(e) {
    const val = e.target.value.trim()

    state.skip = 0

    if (val.length < 2) {
        getProducts()
        return
    }

    searchProducts(val)
}

function onSortChange() {
    const sortBy = $("#sortBy").value
    const order = $("#order").value

    if (!sortBy) {
        getProducts()
        return
    }

    sortProducts(sortBy, order)
}

function onCardClick(e) {
    const card = e.target.closest("[data-i]")
    if (!card) return

    const p = state.viewProducts[+card.dataset.i]
    if (p) openModal(p)
}

function bindEvents() {
    $("#catList").onclick = onCategoryClick
    $("#q").oninput = onSearchInput
    $("#sortBy").onchange = onSortChange
    $("#order").onchange = onSortChange
    $("#cards").onclick = onCardClick

    $("#activeCatBadge").onclick = () => {
        state.skip = 0
        getProducts()

        document.querySelector(".cat.active")?.classList.remove("active")
        document.querySelector('[data-cat="all"]')?.classList.add("active")
    }

    $("#reset").onclick = () => {
        $("#q").value = ""
        $("#sortBy").value = ""
        $("#order").value = "asc"
        state.skip = 0
        getProducts()
    }

    $("#refresh").onclick = () => {
        getProducts()
    }
}

function bindModalEvents() {
    $("#closeModal").onclick = closeModal

    $("#modal").onclick = (e) => {
        if (e.target.id === "modal") {
            closeModal()
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bindEvents()
    bindModalEvents()

    $("#next").onclick = () => {
        state.skip += state.limit
        pageProducts()
    }

    $("#prev").onclick = () => {
        state.skip -= state.limit
        if (state.skip < 0) state.skip = 0
        pageProducts()
    }
})