if (window.top === window) {
    let currentArticleIndex = -1

    window.addEventListener('scroll', function() {
        let articles = document.querySelectorAll('#maincontent article')

        for (let i = 0; i < articles.length; i++) {
            let articleTop = articles[i].getBoundingClientRect().top

            if (articleTop >= 0) {
                currentArticleIndex = i
                break
            }
        }
    })

    document.addEventListener('keydown', function(event) {
        let articles = document.querySelectorAll('#maincontent article')

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