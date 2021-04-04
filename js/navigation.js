/**
 * Génère les boutons de pagination sur l'écran
 *
 * @param {string} [next] - URL de l'api pour la page suivante 
 * @param {string} [prev] - URL de l'api pour la page précédente
 */
function generatePaginationButtons(next = null, prev = null) {
    /**
     * Permet de générer un bouton en fonction
     * de la direction passée en paramètre
     * 
     * @param {string} direction
     * @returns {HTMLButtonElement}
     */
    function createButton(direction) {

        const button = document.createElement('button');
        button.innerHTML = `<img src="img/chevron.svg"/>`;
        if (direction === 'prev') {
            button.className = 'navigation-button prev'
        } else {
            button.className = 'navigation-button next'
        }

        return button
    }

    if (prevButton) prevButton.remove();
    if (nextButton) nextButton.remove();

    if (next && prev) {
        nextButton = createButton('next');
        prevButton = createButton('prev');

        prevButton.addEventListener('click', () => { writeToDocument(prev) });
        nextButton.addEventListener('click', () => { writeToDocument(next) });

        document.body.appendChild(prevButton);
        document.body.appendChild(nextButton)
    } else if (next) {
        nextButton = createButton('next');
        nextButton.addEventListener('click', () => { writeToDocument(next) });
        document.body.appendChild(nextButton)
    } else if (prev) {
        prevButton = createButton('prev');
        prevButton.addEventListener('click', () => { writeToDocument(prev) });
        document.body.appendChild(prevButton)
    }
}

/**
 * Supprime les boutons de navigation du DOM
 *
 */
function destroyNavigationButtons() {
    if (prevButton) prevButton.remove();
    if (nextButton) nextButton.remove()
}