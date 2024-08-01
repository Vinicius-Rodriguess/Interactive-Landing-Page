import { cards } from "./objs/cards.js"
import { modal } from "./objs/modal.js"
import { navbar } from "./objs/navbar.js"
import { jsonContents } from "./objs/json.js"
import { PageConfig } from "./classes/pageConfig.js"
import { path } from "./objs/path.js"
import { scrollSmooth } from "./objs/scrollSmooth.js"
import { feedbackCard } from "./objs/feedbackCard.js"
import { theme } from "./objs/theme.js"

const animationElements = () => {
    const elements = document.querySelectorAll("[data-animate]")
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add(`animate-${entry.target.dataset.animate}`, "played")
        })
    }, { rootMargin: "-80px" })
    elements.forEach(el => observer.observe(el))
}

const languageDefault = 1
export const pageConfig = new PageConfig(languageDefault, path.all, jsonContents)

pageConfig.translate()
cards.render()
modal.events()
navbar.events()
scrollSmooth.init()
feedbackCard.init()
theme.init()
animationElements()

document.querySelector(".input-language").addEventListener("input", (e) => {
    const newLanguage = parseInt(e.target.value)
    pageConfig.setLanguage(newLanguage)
    cards.render()
})

document.querySelector(".btn").addEventListener("click", () => {
    document.querySelector(".container-hidden-cards").classList.toggle("hide")
    document.querySelector(".icon-btn-more").classList.toggle("bi-up")
})

document.addEventListener("keypress", (e) => e.key === "t" && window.open('https://www.tudogostoso.com.br/', '_blank'))