// WIP

function enableHinting() {
  // Array to store hints and corresponding elements
  const hintElements = [];

  // Generate unique hint combinations from 'a', 's', 'd', and 'f'
  const hintCharacters = ['a', 's', 'd', 'f'];
  const hintCombinations = [];

  for (let len = 2; len <= 5; len++) {
    for (let i = 0; i < hintCharacters.length; i++) {
      const combination = [];
      for (let j = 0; j < len; j++) {
        combination.push(hintCharacters[(i + j) % hintCharacters.length]);
      }
      hintCombinations.push(combination.join(''));
    }
  }

  // Function to create hints for visible clickable elements in the scroll area
  function createHintsInScrollArea() {
    const scrollableElement = document.scrollingElement || document.documentElement;
    const viewportHeight = window.innerHeight;

    const clickableElements = document.querySelectorAll(
      'a, button, input[type="submit"], input[type="button"], *[onclick]'
    );

    let hintIndex = 0;

    clickableElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= viewportHeight) {
        // The element is within the current viewport
        const hint = document.createElement('div');
        hint.className = 'hint';
        const hintText = hintCombinations[hintIndex];
        hint.innerText = hintText;
        hint.style.position = 'absolute';
        hint.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        hint.style.color = 'white';
        hint.style.padding = '2px 4px';
        hint.style.borderRadius = '3px';
        hint.style.cursor = 'pointer';
        hint.style.zIndex = '9999'; // Ensure hints are displayed above other content

        hint.addEventListener('click', () => {
          element.click();
        });

        // Position the hint near the clickable element
        hint.style.top = rect.top + 'px';
        hint.style.left = rect.left + 'px';

        document.body.appendChild(hint);

        // Store the hint and corresponding element in the array
        hintElements.push({ hint: hintText, element });

        // Increment hint index
        hintIndex = (hintIndex + 1) % hintCombinations.length;
      }
    });
  }

  // Remove all hints from the page
  function removeHints() {
    const hints = document.querySelectorAll('.hint');
    hints.forEach((hint) => {
      hint.parentNode.removeChild(hint);
    });

    // Clear the hintElements array
    hintElements.length = 0;
  }

  // Toggle hinting mode
  let hinting = false;

  function toggleHintingMode() {
    if (!isTextInputInFocus() && !isKeyComboPressed()) {
      if (!hinting) {
        createHintsInScrollArea();
        hinting = true;
      }
    }
  }

  // Function to exit hinting mode
  function exitHintingMode() {
    removeHints();
    hinting = false;
  }

  // Variables to track input and timer
  let inputBuffer = '';
  let inputTimer = null;

  // Function to process input after a delay
  function processInput() {
    // Check if the entered combination matches any hint
    const selectedHint = hintElements.find((hint) => hint.hint === inputBuffer);

    if (selectedHint) {
      selectedHint.element.click();
    }

    // Clear the input buffer
    inputBuffer = '';
  }

  // Function to check if any HTML text input is in focus
  function isTextInputInFocus() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], textarea');
    for (const input of inputs) {
      if (document.activeElement === input) {
        return true;
      }
    }
    return false;
  }

  // Function to check if any key combination is pressed
  function isKeyComboPressed() {
    return (
      hintCharacters.includes('f') &&
      (e.ctrlKey || e.metaKey) &&
      !isTextInputInFocus()
    );
  }

  // Listen for 'F' key press to toggle hinting mode
  window.addEventListener('keydown', (e) => {
    if (e.key === 'f' && !isTextInputInFocus()) {
      e.preventDefault(); // Prevent the browser's default behavior for 'F'
      toggleHintingMode();
    }
  });

  // Listen for 'Escape' key press to exit hinting mode
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      exitHintingMode();
    }
  });

  // Listen for keyboard input to build the combination
  window.addEventListener('keydown', (e) => {
    if (hinting) {
      const key = e.key;

      // Check if the key corresponds to a hint character ('a', 's', 'd', 'f')
      if (hintCharacters.includes(key)) {
        // Add the key to the input buffer
        inputBuffer += key;

        // Clear the previous timer and set a new one for 2 seconds
        clearTimeout(inputTimer);
        inputTimer = setTimeout(processInput, 2000);
      }
    }
  });

  // Listen for scroll events to remove hints when scrolling starts
  window.addEventListener('scroll', () => {
    if (hinting) {
      exitHintingMode();
    }
  });
}

enableHinting()
