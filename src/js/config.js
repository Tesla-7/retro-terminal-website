export const CONFIG = {
	defaultTheme: 'terminal',
	seasonalTheme: false, // will change the default theme based on the date

	// effects
	effectsDisabledByDefault: false,
	effectsDisabledByDefaultMobile: true,
	displayEffectsSwitch: false,

	// additional effects
	crtEffect: true,
	noiseEffect: false,
	grungeOverlay: false,

	// tabs
	defaultHash: '#home',
	animationOnTabChange: false, // disabled when effects are disabled
	writeAnimationOnTabChange: false, // animationOnTabChange must be true | may cause performance issues

	// blog
	blogUrl: 'https://data.richardapps.net/blog.xml', // example: '/src/example/blog.xml'
	useExample: false,
	writeAnimationOnPostOpen: true,
	showEstimatedReadTime: true,
};
