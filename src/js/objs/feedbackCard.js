import { pageConfig } from "../main.js"
import { path } from "./path.js"

export const feedbackCard = {
    element: document.querySelector(".cont-feedback"),
    closeButton: document.querySelector(".btn-close-cardfeedback"),
    likeButton: document.querySelector(".btn-like-cardfeedback"),
    dislikeButton: document.querySelector(".btn-deslike-cardfeedback"),
    checkboxButtons: document.querySelectorAll(".checkbox-feedback"),
    contentFeedback1: document.querySelector(".feedback-1"),
    contentFeedback2: document.querySelector(".feedback-2"),
    contentFeedback3: document.querySelector(".feedback-3"),
    autoOpen: true,

    init() {
        document.addEventListener("scroll", () => feedbackCard.activeElement())

        feedbackCard.likeButton.addEventListener("click", () => feedbackCard.serviceEvaluation("Good Content"))

        feedbackCard.dislikeButton.addEventListener("click", () => feedbackCard.showOptions())

        feedbackCard.checkboxButtons.forEach(btn => 
            btn.addEventListener("input", (e) => feedbackCard.serviceEvaluation(e.target.value))
        )

        feedbackCard.closeButton.addEventListener("click", () => {
            feedbackCard.close()
            feedbackCard.autoOpen = false
        })
    },

    open() { 
        feedbackCard.element.classList.add("active") 
    },

    close() { 
        feedbackCard.element.classList.remove("active") 
    },

    reset() {
        feedbackCard.autoOpen = true
        feedbackCard.contentFeedback1.classList.remove("hide") 
        feedbackCard.contentFeedback2.classList.add("hide")
        feedbackCard.contentFeedback3.classList.add("hide")
        feedbackCard.checkboxButtons.forEach(btn => btn.checked = false)
        feedbackCard.close()
    },

    showOptions() {
        feedbackCard.contentFeedback1.classList.add("hide") 
        feedbackCard.contentFeedback2.classList.add("hide")
        feedbackCard.contentFeedback3.classList.remove("hide")
    },

    showThanksContent() {
        feedbackCard.contentFeedback1.classList.add("hide")
        feedbackCard.contentFeedback2.classList.remove("hide")
        feedbackCard.contentFeedback3.classList.add("hide")
    },

    activeElement() {
        if (!feedbackCard.autoOpen) return

        const element = document.querySelector(".container-secondary-cards")
        const coordinates = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        coordinates.top <= viewportHeight / 2
            ? feedbackCard.open()
            : feedbackCard.close()
    },

    serviceEvaluation(res) {
        feedbackCard.showThanksContent()
        feedbackCard.autoOpen = false
        setTimeout(() => feedbackCard.close(), 3000)

        for (let key in path) {
            if (path[key].every(e => pageConfig.path.includes(e))) {
                console.log(`${res} - evaluated path: ${key}`)
                break
            }
        }
    },
}