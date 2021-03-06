// VIEWPORT BUGGYFILL
window.viewportUnitsBuggyfill.init();


$(document).ready(function() {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height();
	var isMobile = navigator.userAgent.match(/mobile/i);


	// MOBILE / DESKTOP CLASSES
	if (isMobile) {
		$('body').addClass('mobile');
	} else {
		$('body').addClass('desktop');
	}
	

	// WIDOW CONTROL
	if (windowWidth > 640) {
		$('h1, h2, h3, li, p, figcaption').each(function() {
		    $(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
		});
	}


	// FLOWTYPE
	$('p').flowtype({
		minimum : 700,
		maximum : 1800
	});


	// LAZY LOADING
	// $('.lazy').show();
	window.lazySizesConfig = window.lazySizesConfig || {};
	// window.lazySizesConfig.lazyClass = 'lazy';
	window.lazySizesConfig.srcAttr = 'data-original';
	window.lazySizesConfig.loadMode = 2;
	window.lazySizesConfig.expand = windowHeight * 3.5;
	window.lazySizesConfig.expFactor = 3;
	document.addEventListener('lazybeforeunveil', function(e){
		lazyPos = Math.round($(window).scrollTop());

		$('.work-block').each(function(index) {
			var lazySectionPos = Math.round($(this).offset().top);

			if ( lazyPos >= lazySectionPos && lazyPos < (lazySectionPos + $(this).outerHeight()) ) {
				$('.work-block').removeClass('active');
				$(this).addClass('active');

				thisElement = $(this),
				thisElementPos = Math.round(thisElement.offset().top);

				if ( !$('.work-block').last().hasClass('active') ) {
					nextElement = $(this).next('.work-block');
				}
				if ( !$('.work-block').first().hasClass('active') ) {
					prevElement = $(this).prev('.work-block');
				}
			}
		});
	});

	$('.video-load').lazyload({
		threshold: windowHeight * 2.25,
		load: function(element){
			$('.full, .half').fitVids();
		}
	});


	// RESPONSIVE VIDEOS
	$('.full .half').fitVids();


	// SECTION HEIGHTS FOR LAZY LOADING & ACTIVE ELEMENT ON LOAD
	var loadScrollPos = 0;
	var initialPos = 0,
		scrollDown = false,
		scrollUp = false;
	var thisElement = $('.work-block.active'),
		prevElement = $('.work-block.active').prev('.work-block'),
		nextElement = $('.work-block.active').next('.work-block'),
		thisElementPos,
		prevElementPos,
		nextElementPos;


	// ACTIVE SECTIONS
	$('.work-block').first().addClass('active');
	
	$(window).on('load', function(){
		initialPos = Math.round($(window).scrollTop());

		if ( loadScrollPos >= $('#about').offset().top ) {
			$('.work-block').removeClass('active');
			$('.work-block').last().addClass('active');
		}

		$('.work-block').each(function(index) {
			var thisSectionPos = Math.round($(this).offset().top);

			if ( initialPos >= thisSectionPos && initialPos < (thisSectionPos + $(this).outerHeight()) ) {
				$('.work-block').removeClass('active');
				$(this).addClass('active');

				thisElement = $(this),
				thisElementPos = Math.round(thisElement.offset().top);

				if ( !$('.work-block').last().hasClass('active') ) {
					nextElement = $(this).next('.work-block');
				}
				if ( !$('.work-block').first().hasClass('active') ) {
					prevElement = $(this).prev('.work-block');
				}
			}
		});

		// NAV ELEMENTS
		var aboutOffset = $('#about').offset();
		if ( $('.work-block').first().hasClass('active') ) {
			$('.nav-previous').addClass('inactive');
		} else if ( $('.work-block').last().hasClass('active') || windowScroll >= aboutOffset.top ) {
			$('.nav-next').addClass('inactive');
			$('.work-block').last().addClass('active');
		} else {
			$('.nav-link').removeClass('inactive');
		}
	});


	// SCROLLING
	var windowScroll,
		currentlyScrolling = false;

	$(window).on('scroll', function(){
		windowScroll = Math.round($(window).scrollTop());
		initialPos = windowScroll;

		// DETERMINE ACTIVE ELEMENT BASED ON SCROLL POSITION
		thisElement = $('.work-block.active');
		thisElementPos = Math.round(thisElement.offset().top);

		if ( !$('.work-block').last().hasClass('active') ) {
			nextElement = thisElement.next('.work-block');
		}
		if ( !$('.work-block').first().hasClass('active') ) {
			prevElement = thisElement.prev('.work-block');
		}

		if ( windowScroll >= thisElementPos + thisElement.outerHeight() && !$('.work-block').last().hasClass('active') ) {
			$('.work-block').removeClass('active');
			nextElement.addClass('active');
		}
		if ( windowScroll <= thisElementPos && !$('.work-block').first().hasClass('active') ) {
			$('.work-block').removeClass('active');
			prevElement.addClass('active');
		}

		// NAV ELEMENTS
		var aboutOffset = $('#about').offset();
		if ( $('.work-block').first().hasClass('active') ) {
			$('.nav-previous').addClass('inactive');
		} else if ( $('.work-block').last().hasClass('active') || windowScroll >= aboutOffset.top ) {
			$('.nav-next').addClass('inactive');
		} else {
			$('.nav-link').removeClass('inactive');
		}
	});


	// NAV
	$('.nav-link-top').on('click', function(){
		if ( !currentlyScrolling ) {
			var timing = windowScroll / 2;
			$('#main-header').velocity('scroll', {
				duration: timing,
				easing: 'swing',
				mobileHA: false,
				begin: function() {
					currentlyScrolling = true;
				},
				complete: function() {
					currentlyScrolling = false;
				}
			});
		}

		return false;
	});

	$('.nav-previous').on('click', function(){
		if ( !$(this).hasClass('inactive') && !currentlyScrolling ) {
			thisElement = $('.work-block.active');
			prevElement = thisElement.prev('.work-block'),
			prevElementPos = Math.round(prevElement.offset().top);

			var timing = (windowScroll - prevElementPos) / 1.5;

			$(prevElement).velocity('scroll', {
				duration: timing,
				easing: 'swing',
				offset: 2,
				mobileHA: false,
				begin: function() {
					currentlyScrolling = true;
				},
				complete: function() {
					currentlyScrolling = false;
				}
			});
		}

		return false;
	});
	$('.nav-next').on('click', function(){
		if ( !$(this).hasClass('inactive') && !currentlyScrolling ) {
			thisElement = $('.work-block.active');
			nextElement = thisElement.next('.work-block'),
			nextElementPos = Math.round(nextElement.offset().top);

			var timing = (nextElementPos - windowScroll) / 1.5;

			$(nextElement).velocity('scroll', {
				duration: timing,
				easing: 'swing',
				offset: 2,
				mobileHA: false,
				begin: function() {
					currentlyScrolling = true;
				},
				complete: function() {
					currentlyScrolling = false;
				}
			});
		}

		return false;
	});


	// SOMETHING SOMETHING
	var keys = [],
		dqd = '73,68,68,81,68',
		kfa = '73,68,75,70,65';
	$(document).keydown(function(e){
		keys.push( e.keyCode );

		if ( keys.toString().indexOf( dqd ) >= 0 ) {
			$(document).unbind('keydown', arguments.callee);

			$('#doom').addClass('iddqd');
		}
		if ( keys.toString().indexOf( kfa ) >= 0 ) {
			$(document).unbind('keydown', arguments.callee);

			$('#doom').addClass('idkfa');
		}
	});
});