import { CONFIG } from './config.js';
import { initTheme, addThemeList } from './modules/theme.js';
import { initEffects, initEffectsToggle } from './modules/effects.js';
import { initPosts } from './modules/blog.js';
import { initPictureColl } from './modules/navigation.js';
import { initRouting } from './modules/routing.js';
import { initTooltips } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
	if (!location.hash) {
		location.hash = "#home";
	}
	// Force-config: remove any persisted overrides so CONFIG always wins
	try {
		localStorage.removeItem('theme');
		localStorage.removeItem('effectsDisabled');
	} catch (e) {
		// ignore if localStorage unavailable
	}

	// Enforce visual config flags immediately so later CSS doesn't override them
	(function enforceConfigImmediate() {
		const canvasEl = document.getElementById('canvas');
		if (canvasEl) {
			if (CONFIG.crtEffect) canvasEl.classList.add('crt-effect');
			else canvasEl.classList.remove('crt-effect');
		}
		const noiseEl = document.getElementById('noise-overlay');
		if (noiseEl) {
			if (!CONFIG.noiseEffect) noiseEl.style.setProperty('display', 'none', 'important');
			else noiseEl.style.setProperty('display', 'block', 'important');
		}
		const grungeEl = document.getElementById('grunge-overlay');
		if (grungeEl) {
			if (!CONFIG.grungeOverlay) grungeEl.style.setProperty('display', 'none', 'important');
			else grungeEl.style.setProperty('display', 'block', 'important');
		}
	})();

	addThemeList();
	initTheme();
	initEffects();
	initEffectsToggle();
	initPosts();
	initPictureColl();
	initRouting();
	initTooltips();

	// Close details-tags on default for mobile devices to reduce large amount of text on home-tab
	if (window.matchMedia('(max-width: 767px)').matches) {
		document.querySelectorAll('details').forEach((details) => {
			details.removeAttribute('open');
		});
	}

	// Special config cases (handled earlier)
});
