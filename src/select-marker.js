import { createPlayer } from "./player.js";

const chosenMarker = (function() {
    let lastChosen = null;
    
    const setChosen = (markerDiv) => {
        // if markerDiv doesn't have class, add and toggle it off
        if (!markerDiv.classList.contains('is-chosen')) {
            markerDiv.classList.add('is-chosen');
            markerDiv.classList.toggle('is-chosen');
        }

        // if lastChosen is null, then simply set and toggle
        if (lastChosen === null) {
            lastChosen = markerDiv;
            lastChosen.classList.toggle('is-chosen');
        }
        // if the marker and lastChosen are the same element, return 
        else if (markerDiv === lastChosen) {
            return;
        }
        // else, toggle last, current, and set lastChosen to new
        else {
            lastChosen.classList.toggle('is-chosen');
            markerDiv.classList.toggle('is-chosen');
            lastChosen = markerDiv;
        }
    };

    // get lastChosen. if not selected, return '-' (will be seen as error)
    const getMarkerValue = () => {
        return (lastChosen === null) ? '-' : lastChosen.getAttribute('player-marker');
    };

    return { setChosen, getMarkerValue };
})();

// add event listeners to player marker choice variables
Array.from(document.getElementsByClassName('player-marker-choice')).forEach(function(div) {
    div.addEventListener('click', () => {
        chosenMarker.setChosen(div);
    });
});

// set button to set player choice
document.getElementById('submit-choice-button').addEventListener('click', function(e) {
    e.preventDefault();
    let marker = chosenMarker.getMarkerValue();
    if (marker === '-') {
        // please select a value!
        return;
    }
    
    document.getElementById('marker-selector').close();
});