if (window.top === window) {
    setTimeout(function() {
        const doc = document.querySelectorAll('[aria-label="Hide sidebar"], [aria-label="Expand sidebar"]')

        if (doc.length === 1 && document.readyState === "complete")
            doc[0].click()
    }, 3000)
}
