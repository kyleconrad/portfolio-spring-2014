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


	// SECTION HEIGHTS FOR LAZY LOADING & ACTIVE ELEMENT ON LOAD
	var bigSectionHeight = $('.work-block:first').outerHeight() * 1.5,
		loadScrollPos = 0;
	var initialPos = 0,
		scrollDown = false,
		scrollUp = false;
	var thisElement = $('.work-block.active'),
		prevElement = $('.work-block.active').prev('.work-block'),
		nextElement = $('.work-block.active').next('.work-block'),
		thisElementPos,
		prevElementPos,
		nextElementPos;

	$('.work-block').first().addClass('active');
	
	$(window).on('load', function(){
		initialPos = $(window).scrollTop();

		if ( loadScrollPos >= $('#about').offset().top ) {
			$('.work-block').removeClass('active');
			$('.work-block').last().addClass('active');
		}

		$('.work-block').each(function(index) {
			var thisSectionHeight = $(this).outerHeight() * 1.5,
				thisSectionPos = $(this).offset().top;

			if ( thisSectionHeight > bigSectionHeight ) {
				bigSectionHeight = thisSectionHeight;
			}

			if ( initialPos >= thisSectionPos && initialPos < (thisSectionPos + $(this).outerHeight()) ) {
				$('.work-block').removeClass('active');
				$(this).addClass('active');

				thisElement = $(this),
				thisElementPos = Math.round(thisElement.offset().top);

				if ( !$('.work-block').last().hasClass('active') ) {
					nextElement = $(this).next('.work-block'),
					nextElementPos = Math.round(nextElement.offset().top);
				}
				if ( !$('.work-block').first().hasClass('active') ) {
					prevElement = $(this).prev('.work-block'),
					prevElementPos = Math.round(prevElement.offset().top);
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


	// LAZY LOADING
	$('.lazy').show();
	// window.lazySizesConfig = window.lazySizesConfig || {};
	// lazySizesConfig.lazyClass = 'lazy';
	// lazySizesConfig.srcAttr = 'data-original';
	// lazySizesConfig.loadMode = 2;
	// lazySizesConfig.expand = (bigSectionHeight / 3);
	// lazySizesConfig.expFactor = 3;

	// $('.video-load').lazyvideoload({
	// 	// threshold: windowHeight + (windowHeight / 4),
	// 	threshold: bigSectionHeight,
	// 	load: function(element){
	// 		$('.full, .half').fitVids();
	// 	}
	// });


	// RESPONSIVE VIDEOS
	$('.full .half').fitVids();


	// SCROLLING
	var windowScroll,
		currentlyScrolling = false;

	$(window).on('scroll', function(){
		windowScroll = Math.round($(window).scrollTop());

		// DETERMINE ACTIVE ELEMENT BASED ON SCROLL POSITION
		thisElement = $('.work-block.active');
		thisElementPos = Math.round(thisElement.offset().top);

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
});