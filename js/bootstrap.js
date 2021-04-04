const DEBUG = false;

const CancelToken = axios.CancelToken;
let cancel;
let getDataDebounce;

/** @type {HTMLButtonElement} */
let prevButton, nextButton;

const GSAP_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js';
let gsapIsReady = false;
let spaceshipFactory;
const settings = {
    withAnimation: true,
    timeoutBeforeTravel: 3000
};

const apiUrl = 'https://swapi.dev/api/';
const dataMapping = {
    'People': 'people',
    'Planets': 'planets',
    'Species': 'species',
    'Starships': 'starships',
    'Vehicles': 'vehicles',
    'Films': 'films',
};

// Utilities

window.log = console.log;

/**
 * Génère un identifiant unique
 *
 * @return {string} 
 */
function uniqId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Récupère les données en GET avec axios
 *
 * @param {string} url - Lien de l'api à appeler
 * @param {CallableFunction} callback - Callback si requête réussie
 * @param {CallableFunction} [completed=function() {}] - Callback lorsque la requête est terminée
 */
function getData(url, callback, completed = function () { }) {

    axios.get(url)
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (err) {
            if (DEBUG) console.log(err)
        })
        .then(completed);
}
