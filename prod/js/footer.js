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
	$('.lazy').show().lazyload({
		effect: 'fadeIn',
		skip_invisible: false,
		//placeholder: 'img/trans.png',
		threshold: windowHeight
	});


	// RESPONSIVE VIDEOS
	$('.full').fitVids();
});