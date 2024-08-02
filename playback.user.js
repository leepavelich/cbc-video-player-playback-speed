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
        document.querySelectorAll('video[data-name="phoenix-playback-element"]').forEach(video => {
            video.playbackRate = 2;
        });
    };

    const onMutation = (mutations) => {
        if (mutations.some(mutation => mutation.addedNodes.length)) {
            setVideoSpeed();
        }
    };

    const observer = new MutationObserver(onMutation);

    const initObserver = () => {
        observer.observe(document.body, { childList: true, subtree: true });
    };

    const onPageLoad = () => {
        setVideoSpeed();
        initObserver();
        setInterval(setVideoSpeed, 5000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onPageLoad);
    } else {
        onPageLoad();
    }
})();
