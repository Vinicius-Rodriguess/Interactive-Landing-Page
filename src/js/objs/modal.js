import { pageConfig } from "../main.js"
import { dictionary } from "./dictionary.js"

export const modal = {
    element: document.querySelector(".container-modal"),
    img: document.querySelector(".content-img"),
    imgUrl: null,
    currentImgIndex: null,
    imgsCounter: document.querySelector(".span-counter"),

    get allImgs() {
        return [...document.querySelectorAll(".content-img")]
    },

    open() {
        modal.element.classList.remove("hide")
        document.body.classList.add("no-scroll")
    },

    close() {
        modal.element.classList.add("hide")
        document.body.classList.remove("no-scroll")
    },

    changeImg(img) {
        modal.open()
        modal.imgUrl = `url("${img}")`
        modal.img.style.backgroundImage = modal.imgUrl
        modal.updateImgCounter()
    },

    updateImgCounter() {
        modal.imgsCounter.innerHTML = 
        `${dictionary.translate("image", pageConfig.language)} ${modal.findImageIndex() + 1}/${modal.allImgs.length - 1}`
    },

    findImageIndex() {
        return modal.allImgs.findIndex(img => img.style.backgroundImage === modal.imgUrl)
    },

    moveImg(index) {
        if (modal.currentImgIndex === null) 
            modal.currentImgIndex = modal.findImageIndex()
        
        modal.currentImgIndex += index

        const imgsLength = modal.allImgs.length

        if (modal.currentImgIndex < 0)
            modal.currentImgIndex = imgsLength - 1

        if (modal.currentImgIndex >= imgsLength)
            modal.currentImgIndex = 0

        const newUrl = modal.allImgs[modal.currentImgIndex].style.backgroundImage.replace(/url\("?|"?\)/g, '')

        modal.updateImgCounter()
        modal.changeImg(newUrl)
    },

    events() {
        document.querySelector(".btn-modal").addEventListener("click", () => modal.close())
        document.querySelector(".btn-modal-next").addEventListener("click", () => modal.moveImg(+1))
        document.querySelector(".btn-modal-previus").addEventListener("click", () => modal.moveImg(-1))
    }
}