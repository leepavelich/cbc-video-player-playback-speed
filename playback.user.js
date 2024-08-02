// ==UserScript==
// @name         CBC Olympics Video Speed Modifier
// @namespace    leepavelich
// @version      0.1
// @description  Automatically sets CBC Olympics video playback speed to 2x
// @match        https://cbc.ca/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const setVideoSpeed = () => {
        const video = document.querySelector('video[data-name="phoenix-playback-element"]');
        if (video) {
            video.playbackRate = 2;
            console.log('Video speed set to 2x');
        } else {
            console.log('Video element not found');
        }
    }

    setVideoSpeed();
    setInterval(setVideoSpeed, 5000);
})();
