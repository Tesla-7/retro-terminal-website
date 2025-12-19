import { CONFIG } from '../config.js';

const EFFECTS_CSS_URL = '/assets/css/effects.css';

// Ensure config default takes precedence over any previously stored user choice.
if (CONFIG.effectsDisabledByDefault && !('effectsDisabled' in localStorage)) {
	localStorage.setItem('effectsDisabled', 'true');
} else if (!CONFIG.effectsDisabledByDefault && 'effectsDisabled' in localStorage) {
	// Remove stored override so the config default is respected
	localStorage.removeItem('effectsDisabled');
}

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

let effectsStyle = document.createElement('link');
effectsStyle.rel = 'stylesheet';
effectsStyle.type = 'text/css';
effectsStyle.href = EFFECTS_CSS_URL;

function updateEffectsState() {
	if (!effectsDisabled) {
		document.head.appendChild(effectsStyle);
	}
}

function toggleEffects() {
	effectsDisabled = !effectsDisabled;
	localStorage.setItem('effectsDisabled', effectsDisabled);
	updateEffectsState();
	location.reload();
}

export function getEffectsDisabledState() {
	return effectsDisabled;
}

export function initEffectsToggle() {
	// Dynamic toggle link
	const toggleEl = document.getElementById('toggle-effects');
	if (!toggleEl) return; // nothing to do if element is missing

	// Dynamic toggle link
	if (!CONFIG.displayEffectsSwitch) {
		toggleEl.style.display = 'none';
		return;
	}

	const nfbText = toggleEl;
	nfbText.innerHTML = `Don't like the effects? Click <a id="toggle-effects-link" href="#">HERE</a> to turn them ${
		effectsDisabled ? 'on' : 'off'
	}.`;

	const linkEl = document.getElementById('toggle-effects-link');
	if (linkEl) {
		linkEl.addEventListener('click', (event) => {
			event.preventDefault();
			toggleEffects();
		});
	}
}

export function initEffects() {
	if (
		window.matchMedia('(max-width: 767px)').matches &&
		!('effectsDisabled' in localStorage) &&
		CONFIG.effectsDisabledByDefaultMobile
	) {
		effectsDisabled = true;
	}

	updateEffectsState();
}
