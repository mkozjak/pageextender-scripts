if (window.top === window) {
    // FIXME: not supported on s3, iam, systems manager, cloudwatch, acm...
    if (document.querySelectorAll('nav[class*="_toggle_"]')[0].ariaHidden === "true") {
        document.querySelectorAll('span[class*="_close-button_"]')[0]
        .getElementsByTagName("button")[0]
        .click()
    }
}
