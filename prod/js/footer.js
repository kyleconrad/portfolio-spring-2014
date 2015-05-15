// VIEWPORT BUGGYFILL
window.viewportUnitsBuggyfill.init();


$(document).ready(function() {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height();
	var isMobile = navigator.userAgent.match(/mobile/i);
	

	// WIDOW CONTROL
	if (windowWidth > 640) {
		$('h1, h2, h3, li, p, figcaption').each(function() {
		    $(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
		});
	}


	// LAZY LOADING
	$('.lazy').show();
	window.lazySizesConfig = window.lazySizesConfig || {};
	lazySizesConfig.lazyClass = 'lazy';
	lazySizesConfig.expand = Math.min(Math.max(document.documentElement.clientWidth, innerWidth), Math.max(document.documentElement.clientHeight, innerHeight)) > 600 ? 500 : 319;
	lazySizesConfig.srcAttr = 'data-original';
	lazySizesConfig.loadMode = 2;
	lazySizesConfig.expFactor = 2.5;

	$('.video-load').lazyvideoload({
		threshold: windowHeight + (windowHeight / 4),
		load: function(element){
			$('.full, .half').fitVids();
		}
	});


	// RESPONSIVE VIDEOS
	$('.full .half').fitVids();
});