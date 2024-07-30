if (window.top === window) {
    document.getElementsByClassName("global-navigation")[0].remove()
    document.getElementsByClassName("page__right-rail")[0].remove()
    document.getElementsByClassName("main-container")[0].style.margin = 0
    document.getElementsByClassName("main-container")[0].style.width = "100%"
    document.getElementsByClassName("fandom-community-header__background cover fullScreen ")[0].style.width = "100%"
}
