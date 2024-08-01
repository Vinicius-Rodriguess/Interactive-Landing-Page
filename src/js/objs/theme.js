export const theme = {
    btn: document.querySelector(".btn-change-theme"),
    root: document.documentElement,
    currentTheme: null,
    auto: true,

    autoClassBtn: "bi-brilliance",
    darkClassBtn: "bi-moon",
    lightClassBtn: "bi-brightness-high",

    darkClassRoot: "dark",
    lightClassRoot: "light",

    init() {
        if (!theme.btn || !theme.root) return

        theme.detectTheme()

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () =>
            theme.auto && theme.detectTheme()
        )

        theme.btn.addEventListener("click", () =>
            theme.toggleTheme()
        )
    },

    detectTheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.currentTheme = isDarkMode ? "dark" : "light"
        theme.applyTheme()
    },

    applyTheme() {
        theme.btn.classList.remove(theme.autoClassBtn, theme.darkClassBtn, theme.lightClassBtn)
        theme.root.classList.remove(theme.darkClassRoot, theme.lightClassRoot)

        if (theme.currentTheme === "dark") {
            theme.btn.classList.add(theme.darkClassBtn)
            theme.root.classList.add(theme.darkClassRoot)
        }

        if (theme.currentTheme === "light") {
            theme.btn.classList.add(theme.lightClassBtn)
            theme.root.classList.add(theme.lightClassRoot)
        }

        if (theme.auto) {
            theme.btn.classList.remove(theme.darkClassBtn, theme.lightClassBtn)
            theme.btn.classList.add(theme.autoClassBtn)
        }
    },

    toggleTheme() {
        if (theme.auto) {
            theme.currentTheme = "dark"
            theme.auto = false
            theme.applyTheme()
            return
        }

        if (theme.currentTheme === "dark") {
            theme.currentTheme = "light"
            theme.applyTheme()
            return
        }

        if (theme.currentTheme === "light") {
            theme.auto = true
            theme.detectTheme()
            return
        }
    },
}