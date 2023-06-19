if (window.top === window) {
    const doc = document.querySelectorAll('[aria-label="Hide sidebar"], [aria-label="Expand sidebar"]')

    if (doc.length === 1)
        doc[0].click()
}
