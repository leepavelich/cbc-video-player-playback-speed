// ==UserScript==
// @name         CBC Olympics Video Speed Modifier
// @namespace    leepavelich
// @version      0.3
// @description  Adds playback speed controls to CBC Olympics video player
// @match        https://www.cbc.ca/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const speeds = [0.5, 1.0, 1.5, 2.0];
    let currentSpeedIndex = speeds.indexOf(1.0); // Default to normal speed

    const createSpeedControl = () => {
        const speedControl = document.createElement('div');
        speedControl.className = 'speed-control';
        speedControl.style.cssText = 'display: inline-block; margin-right: 10px; position: relative;';
        speedControl.innerHTML = `
          <button class="speed-btn" style="background: none; border: none; color: white; font-size: 14px; cursor: pointer; padding: 5px;">
            ${speeds[currentSpeedIndex]}x
          </button>
        `;
        return speedControl;
    };

    const updateSpeed = (btn) => {
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        const newSpeed = speeds[currentSpeedIndex];
        btn.textContent = `${newSpeed}x`;
        document.querySelector('video[data-name="phoenix-playback-element"]').playbackRate = newSpeed;
    };

    const addSpeedControl = () => {
        const controlRack = document.querySelector('.phx-controls-right');
        if (controlRack && !document.querySelector('.speed-control')) {
            const speedControl = createSpeedControl();
            const speedBtn = speedControl.querySelector('.speed-btn');
            speedBtn.addEventListener('click', () => updateSpeed(speedBtn));
            controlRack.insertBefore(speedControl, controlRack.firstChild);
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
