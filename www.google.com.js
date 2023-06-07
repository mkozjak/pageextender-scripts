if (window.top === window) {
    // Get all the div elements on the page
    const divElements = document.getElementsByTagName('div');

    // Regular expression to match URLs
    const regex = /www\.forbes\.com/i;

    // Iterate over the div elements
    for (let i = divElements.length - 1; i >= 0; i--) {
        const divElement = divElements[i];

        // Check if the div contains a link to www.forbes.com or app.asana.com
        const anchorElements = divElement.getElementsByTagName('a');
        for (let j = anchorElements.length - 1; j >= 0; j--) {
            const anchorElement = anchorElements[j];
            const href = anchorElement.href;
            if (href && regex.test(href)) {
                // Remove the div element
                divElement.parentNode.removeChild(divElement);
                break; // Exit the inner loop since we found a match
            }
        }
    }
}