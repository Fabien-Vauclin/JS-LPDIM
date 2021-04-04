/**
 * Initialise l'application
 */
window.onload = function () {
    const categories = document.getElementById('categories');
    for (const [title, url] of Object.entries(dataMapping)) {
        const button = document.createElement('button');
        button.setAttribute('onclick', `writeToDocument('${apiUrl}${url}')`);
        button.textContent = title;
        categories.appendChild(button);
    }

    if (settings.withAnimation) initAnitmation()
};

/**
 * Initialise l'animation des vaisseaux spatiaux
 *
 */
function initAnitmation() {

    let script = document.createElement('script');
    script.src = GSAP_CDN;
    script.onload = () => {
        gsapIsReady = true;
        spaceshipFactory = new SpaceShipFactory();
        spaceshipFactory.create('light', 1);
        spaceshipFactory.create('dark', 3)
    };
    script.onerror = () => gsapIsReady = false;

    document.body.appendChild(script)

}

/**
 * Met à jour la vue
 */
function writeToDocument(url) {
    const element = document.getElementById("data");
    element.innerHTML = "";

    destroyNavigationButtons();


    if (spaceshipFactory) {
        spaceshipFactory.travel();
        spaceshipFactory.showCockpit()
    }

    if (getDataDebounce) clearTimeout(getDataDebounce);
    getDataDebounce = setTimeout(function () {
        axios.get(url, {
            cancelToken: new CancelToken(function executor(c) { cancel = c; })
        }).then(function (response) {
            let data = response.data;
            let cards = data.results.map(makeCard);

            if (spaceshipFactory) {
                spaceshipFactory.animate();
                spaceshipFactory.hideCockpit()
            }

            element.innerHTML = `<div class="cards-container fade-in">${cards}</div>`.replace(/,/g, "");
            generatePaginationButtons(data.next, data.previous);

        }).catch(function (err) {
            if (DEBUG) log(err)
        })
    }, settings.timeoutBeforeTravel)

}

