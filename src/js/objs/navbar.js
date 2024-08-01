import { pageConfig } from "../main.js"
import { path } from "./path.js"
import { cards } from "./cards.js"
import { feedbackCard } from "./feedbackCard.js"

export const navbar = {
    element: document.querySelector(".container-navbar"),
    btn: document.querySelector(".btn-navbar"),
    btns: document.querySelectorAll(".btn-content"),
    container: document.querySelector(".container-general"),

    toggle() {
        navbar.element.classList.contains("width") ? 
        navbar.close() : navbar.open()
    },

    open() {
        navbar.element.classList.add("width")
        navbar.container.classList.add("active-navbar")
        navbar.transformBtn()
        navbar.animateBtn()
    },

    close() {
        navbar.element.classList.remove("width")
        navbar.container.classList.remove("active-navbar")
        navbar.transformBtn()
        navbar.animateBtn()
    },

    transformBtn() {
        navbar.btn.classList.toggle("bi-x")
        navbar.btn.classList.toggle("bi-list")
    },

    animateBtn() {
        navbar.btn.classList.toggle("btn-ani-left")
        navbar.btn.classList.toggle("btn-ani-right")
    },

    events() {
        navbar.btn.addEventListener("click", () => navbar.toggle())

        setInterval(() => navbar.animateBtn(), 15000)

        navbar.btns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                pageConfig.path = path[e.target.getAttribute("path")]
                cards.render()
                navbar.close()
                feedbackCard.reset()
            })
        })

        document.querySelector(".container-general").addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-navbar")) return
            if (navbar.element.classList.contains("width")) navbar.close()
        })
    }
}