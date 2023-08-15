if (window.top === window) {
	let airPlayLink = null

	document.addEventListener('keydown', function(event) {
	    if (event.key === 'a') {
	        // Use the saved link here
	        console.log("OPEN", airPlayLink)
	        window.open(airPlayLink, '_self')
	    }
	})

	// add method to fetch me the first link which supports airplay
	if (window.location.pathname.includes('/event/')) {
		const linksBlock = document.getElementById('links_block')
		getAirPlayLink(linksBlock)
	}

	if (window.location.pathname.includes('/embed77/')) {
		const video = document.querySelector('video');

		if (window.WebKitPlaybackTargetAvailabilityEvent) {
		    video.addEventListener('webkitplaybacktargetavailabilitychanged', function(event) {
		        if (event.availability === 'available') {
		            const airPlayButton = document.createElement('button')
		            airPlayButton.textContent = 'AirPlay'

		            airPlayButton.addEventListener('click', function() {
		                video.webkitShowPlaybackTargetPicker()
		            })

		            document.body.appendChild(airPlayButton)
		        }
		    })
		}
	}

	function getAirPlayLink(element) {
		if (element.tagName === 'A' && element.href && element.href.includes('embedstream.me')) {
			airPlayLink = element.href
			return
		}

		for (let i = 0; i < element.children.length; i++)
			getAirPlayLink(element.children[i])
	}
}
