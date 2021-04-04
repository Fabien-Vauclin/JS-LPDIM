/**
 * @typedef APILinkable
 * @property {boolean} result
 * @property {string} category
 */


/**
 * Crée le composant carte
 *
 * @param {object} item
 * @return {string} - Template de la carte (.card)
 */
function makeCard(item) {
    const cardData = Object.keys(item).map(key => makeCardField(item, key));
    return `<div class="card">${cardData}</div>`;
}

/**
 * Génère les différentes lignes de la carte
 *
 * @param {any} item
 * @param {string} key
 * @return {string} - Template de ligne de carte (.data-row) 
 */
function makeCardField(item, key) {
    let data = item[key];

    if (!data) return '';

    let api = isAPILink(data);

    if (api.result) {

        const ID = uniqId();
        asyncAdditionnalLoad(ID, data, api);

        return `<div class="data-row"><label>${key}</label><span id="${ID}"> Loading... </span></div>`;
    }

    const itemData = data.toString();
    return `<div class="data-row"><label>${key}</label><span>${itemData}</span></div>`;
}

/**
 * S'il s'agit d'un lien vers l'API, refaire une requête vers cette dernière
 *
 * @param {string} ID
 * @param {string|object} data
 * @param {object} api
 */
function asyncAdditionnalLoad(ID, data, api) {

    setTimeout(function () {

        if (typeof data === 'object') {
            data.forEach(function (element, index) {
                getData(element, function (response) {
                    let container = document.getElementById(ID);
                    if (index === 0) {
                        container.innerHTML = getLabel(api.category, response)
                    } else {
                        container.innerHTML += getLabel(api.category, response)
                    }
                })
            });
        } else {
            getData(data, function (response) {
                let container = document.getElementById(ID);
                container.innerHTML = getLabel(api.category, response)
            })
        }

    }, 10)

}

/**
 * Permet de vérifier s'il s'agit d'un lien vers l'API
 *
 * @param {string|object} data
 * @return {APILinkable}
 */
function isAPILink(data) {

    let category = null;

    if (typeof data === 'object') {
        if (!data || !data.length) {
            return { result: false, category }
        }
        data = data[0]
    }

    let regex = new RegExp(/^(http|https):\/\/swapi\.dev\/api\//);
    let result = regex.test(data);

    if (result) {
        let targetUrl = data.replace(regex, "");
        category = targetUrl.replace(/\/.+/, "")
    }

    return { result, category }

}

/**
 * Retourne la valeur de la donnée demandée
 * sous forme de chaîne de caractère
 * 
 * @param {string} category - Intitulé de la catégorie
 * @param {object} data - Donnée à analyser
 * @returns {string}
 */
function getLabel(category, data) {
    let property = '';

    switch (category) {
        case 'films':
            property = 'title';
            break;
        default:
            property = 'name';
    }

    return data[property] + "<br>"
}
