if (window.top === window) {
    window.onload = function() {
        let currentArticleIndex = -1

        window.addEventListener('scroll', function() {
            const articles = loadArticles()

            for (let i = 0; i < articles.length; i++) {
                let articleTop = articles[i].getBoundingClientRect().top

                if (articleTop >= 0) {
                    currentArticleIndex = i
                    break
                }
            }
        })

        document.addEventListener('keydown', function(event) {
            const articles = loadArticles()

            if (event.key === 'j') {
                if (currentArticleIndex < articles.length) {
                    currentArticleIndex++
                    articles[currentArticleIndex].scrollIntoView()
                }
            } else if (event.key === 'k') {
                if (currentArticleIndex > 0) {
                    currentArticleIndex--
                    articles[currentArticleIndex].scrollIntoView()
                }
            }
        })
    }
}

function loadArticles() {
    let articles = []

    const containers = document.querySelectorAll('.container.med.left.river__posts')

    containers.forEach(container => {
        const section = container.querySelectorAll('article')
        section.forEach(article => articles.push(article))
    })

    return articles
}