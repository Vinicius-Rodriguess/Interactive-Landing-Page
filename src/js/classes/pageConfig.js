import { dictionary } from "../objs/dictionary.js"

export class PageConfig  {
    elements = document.querySelectorAll("[translate]")

    constructor(language, path, contents) {
        this.language = language
        this.path = path
        this.contents = contents
    }

    translate() {
        this.elements.forEach(word =>
            word.innerText = dictionary.translate(
                word.getAttribute("translate"),
                this.language
            )
        )
    }

    setLanguage(newLanguage) {
        this.language = newLanguage
        this.translate()
    }
}