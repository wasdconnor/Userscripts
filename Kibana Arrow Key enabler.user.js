// ==UserScript==
// @name         Kibana Arrow Key enabler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enabeles the use of arrow keys to navigate through the dashboards instead of clicking the arrow button in the botton of the screen. Makes it a lot easier to scan through the dashboard
// @author       Connor Frost
// @match        https://gms-prod-kibana.logistics.com/s/cloudops/app/canvas*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';



    function onKeydown(evt) {
        if (evt.keyCode == 37) { //left arrow key
            var allElements = document.getElementsByClassName('euiButtonIcon euiButtonIcon--text');
            for (var i = 0; i < allElements.length; i++) {
                var thisElement = allElements[i];
                if (thisElement.getAttribute("aria-label") == "Previous Page") {
                    thisElement.click();
                }
            }
        } else if (evt.keyCode == 39) { // right arrow key
            allElements = document.getElementsByClassName('euiButtonIcon euiButtonIcon--text');
            for (i = 0; i < allElements.length; i++) {
                thisElement = allElements[i];
                if (thisElement.getAttribute("aria-label") == "Next Page") {
                    thisElement.click();
                }
            }
        }
    }
    document.addEventListener('keydown', onKeydown, true);
}());

