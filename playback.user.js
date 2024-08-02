// ==UserScript==
// @name         CBC Olympics Video Speed Modifier
// @namespace    leepavelich
// @version      0.1
// @description  Automatically sets CBC Olympics video playback speed to 2x
// @match        https://cbc.ca/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function setVideoSpeed() {
        const video = document.querySelector('video[data-name="phoenix-playback-element"]');
        if (video) {
            video.playbackRate = 2;
        }
    }

    function onPageLoad() {
        setVideoSpeed();
      
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    setVideoSpeed();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setInterval(setVideoSpeed, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onPageLoad);
    } else {
        onPageLoad();
    }
})();
