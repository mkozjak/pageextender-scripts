if (window.top === window) {
    if (document.querySelectorAll('nav[class*="_toggle_"]')[0].ariaHidden === "true") {
        document.querySelectorAll('span[class*="_close-button_"]')[0]
        .getElementsByTagName("button")[0]
        .click()
    }
}
