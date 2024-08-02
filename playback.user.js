// ==UserScript==
// @name         CBC Olympics Video Speed Modifier
// @namespace    leepavelich
// @version      0.4
// @description  Adds playback speed controls to CBC Olympics video player
// @match        https://www.cbc.ca/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const speeds = [0.5, 1.0, 1.5, 2.0];
    let currentSpeedIndex = speeds.indexOf(1.0);
    const createSpeedControl = () => {
        const speedControl = document.createElement('button');
        speedControl.className = 'speed-control';
        speedControl.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 14px;
            cursor: pointer;
            padding: 8px 5px;
            margin-right: 10px;
            vertical-align: middle;
        `;
        speedControl.textContent = `${speeds[currentSpeedIndex]}x`;
        return speedControl;
    };

    const updateSpeed = (btn) => {
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        const newSpeed = speeds[currentSpeedIndex];
        btn.textContent = `${newSpeed}x`;
        document.querySelector('video[data-name="phoenix-playback-element"]').playbackRate = newSpeed;
    };

    const addSpeedControl = () => {
        const fullscreenBtn = document.querySelector('fullscreen-btn');
        if (fullscreenBtn && !document.querySelector('.speed-control')) {
            const speedControl = createSpeedControl();
            speedControl.addEventListener('click', () => updateSpeed(speedControl));
            fullscreenBtn.parentNode.insertBefore(speedControl, fullscreenBtn);
        }
    };

    const initialize = () => {
        addSpeedControl();
        const video = document.querySelector('video[data-name="phoenix-playback-element"]');
        if (video) video.playbackRate = speeds[currentSpeedIndex];
    };

    initialize();
    setInterval(initialize, 2000);
})();
