import { pageConfig } from "../main.js"
import { dictionary } from "../objs/dictionary.js"
import { modal } from "../objs/modal.js"
import { path } from "./path.js"


export const cards = {
    render() {
        window.scrollTo({ 
            top: 0, 
            behavior: "smooth" 
        })

        const mainContainer = document.querySelector(".container-main-cards")
        const secondaryContainer = document.querySelector(".container-secondary-cards")
        const hiddenContainer = document.querySelector(".container-hidden-cards")

        mainContainer.innerHTML = ""
        secondaryContainer.innerHTML = ""
        hiddenContainer.innerHTML = ""

        const contents = pageConfig.path.map(id => pageConfig.contents.find(content => content.id === id))

        for (const card of contents) {
            if (card.main)
                mainContainer.appendChild(cards.createMainCard(card))
            
            else if (secondaryContainer.children.length < 3)
                secondaryContainer.appendChild(cards.createSecondaryCard(card))

            else
                hiddenContainer.appendChild(cards.createSecondaryCard(card))
        }
    },

    createMainCard(card) {
        const section = document.createElement("section")
        section.classList.add("section-container")
        section.setAttribute("data-animate", "bottom")
        section.id = card.id

        const textContainer = document.createElement("div")
        textContainer.classList.add("text-container")
        section.appendChild(textContainer)

        const contentTag = document.createElement("div")
        contentTag.classList.add("content-tag")
        textContainer.appendChild(contentTag)

        const h2 = document.createElement("h2")
        h2.innerHTML = dictionary.translate(card.tag, pageConfig.language)
        contentTag.appendChild(h2)

        const contentTitle = document.createElement("div")
        contentTitle.classList.add("content-title")
        textContainer.appendChild(contentTitle)

        const h3 = document.createElement("h3")
        h3.innerHTML = dictionary.translate(card.title, pageConfig.language)
        contentTitle.appendChild(h3)

        const content = document.createElement("div")
        content.classList.add("content")
        textContainer.appendChild(content)

        const p = document.createElement("p")
        p.innerHTML = dictionary.translate(card.description, pageConfig.language)
        content.appendChild(p)

        const contentInstructions = document.createElement("div")
        contentInstructions.classList.add("content-instructions")
        textContainer.appendChild(contentInstructions)

        const list = document.createElement("ol")
        card.list.forEach(item => {
            const li = document.createElement("li")
            li.innerText = dictionary.translate(item, pageConfig.language)
            list.appendChild(li)
        })
        contentInstructions.appendChild(list)

        const imgContainer = document.createElement("div")
        imgContainer.classList.add("img-container")
        section.appendChild(imgContainer)

        const contentImg = document.createElement("div")
        contentImg.classList.add("content-img")
        contentImg.style.backgroundImage = `url(${card.img})`
        contentImg.addEventListener("click", () => modal.changeImg(card.img))
        imgContainer.appendChild(contentImg)

        return section
    },

    createSecondaryCard(card) {
        const cardContainer = document.createElement("div")
        cardContainer.classList.add("card")
        cardContainer.setAttribute("data-animate", "bottom")
        cardContainer.addEventListener("click", () => {
            pageConfig.path = path[card.action]
            cards.render()
        })

        const containerText = document.createElement("div")
        containerText.classList.add("card-container-text")
        cardContainer.appendChild(containerText)

        const h2 = document.createElement("h2")
        h2.innerHTML = dictionary.translate(card.tag, pageConfig.language)
        containerText.appendChild(h2)

        const h3 = document.createElement("h3")
        h3.innerHTML = dictionary.translate(card.title, pageConfig.language)
        containerText.appendChild(h3)

        const a = document.createElement("a")
        a.innerHTML = dictionary.translate("learnmore", pageConfig.language)
        containerText.appendChild(a)

        const i = document.createElement("i")
        i.classList.add("bi", "bi-arrow-up-right")
        a.appendChild(i)

        const cardImg = document.createElement("div")
        cardImg.classList.add("card-img")
        cardImg.style.backgroundImage = `url(${card.img})`
        cardContainer.appendChild(cardImg)

        return cardContainer
    }
}