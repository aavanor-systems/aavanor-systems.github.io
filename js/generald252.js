var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/* global script variables */
var $parallex_effect = true;
var window_width = 0;

jQuery(document).ready(function($){

	/* Handles functionality that depends on window resize */
	var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	window_width = Math.max( jQuery( window ).width(), innerWidth );
	jQuery( window ).resize(function() {
		adjust_nav_functionality();
	});

	// fancybox
	jQuery('.fancybox').fancybox();

	// superfish
	if( window_width > 1024 ){
		jQuery('#header #main-nav').superfish({
			disableHI: true
		});
	}

		var filterLinks = jQuery('#filter li');

		filterLinks.click( function(e) {

				filterLinks.removeClass('active');

				filterLinks.not(this).find('span.border').fadeOut(100);

				jQuery(this).addClass('active');

				e.preventDefault();
		});


		filterLinks.hover( function() {
				jQuery(this).not('.active').find('.border').stop().css({
						opacity: 0,
						display: 'block'
				}).animate({
						opacity: 1
				}, 150);

		}, function() {
				jQuery(this).not('.active').find('.border').stop().fadeOut(150);
		});

		if (jQuery().quicksand) {

				(function($) {

						$.fn.sorted = function(customOptions) {
								var options = {
										reversed: false,
										by: function(a) {
												return a.text();
										}
								};

								$.extend(options, customOptions);

								$data = jQuery(this);
								arr = $data.get();
								arr.sort(function(a, b) {

										var valA = options.by($(a));
										var valB = options.by($(b));

										if (options.reversed) {
												return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
										} else {
												return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
										}

								});

								return $(arr);

						};

				})(jQuery);

				jQuery(function() {

						var read_button = function(class_names) {

								var r = {
										selected: false,
										type: 0
								};

								for (var i=0; i < class_names.length; i++) {

										if (class_names[i].indexOf('selected-') == 0) {
												r.selected = true;
										}

										if (class_names[i].indexOf('segment-') == 0) {
												r.segment = class_names[i].split('-')[1];
										}
								};

								return r;

						};

						var determine_sort = function($buttons) {
								var $selected = $buttons.parent().filter('[class*="selected-"]');
								return $selected.find('a').attr('data-value');
						};

						var determine_kind = function($buttons) {
								var $selected = $buttons.parent().filter('[class*="selected-"]');
								return $selected.find('a').attr('data-value');
						};

						var $preferences = {
								duration: 500,
								adjustHeight: 'dynamic'
						}

						var $list = jQuery('.grid');
						var $data = $list.clone();

						var $controls = jQuery('#filter');

						$controls.each(function(i) {

								var $control = jQuery(this);
								var $buttons = $control.find('a');

								$buttons.bind('click', function(e) {

										var $button = jQuery(this);
										var $button_container = $button.parent();

										var button_properties = read_button($button_container.attr('class').split(' '));
										var selected = button_properties.selected;
										var button_segment = button_properties.segment;

										if (!selected) {

												$buttons.parent().removeClass();
												$button_container.addClass('selected-' + button_segment);

												var sorting_type = determine_sort($controls.eq(1).find('a'));
												var sorting_kind = determine_kind($controls.eq(0).find('a'));
												var $filtered_data = '';

												if (sorting_kind == 'all') {
														 $filtered_data = $data.find('li');
												} else {
														 $filtered_data = $data.find('li.' + sorting_kind);
												}

												var $sorted_data = $filtered_data.sorted({
														by: function(v) {
																return parseInt(jQuery(v).find('.count').text());
														}
												});

												$list.quicksand($sorted_data, $preferences, function () {
														jQuery( '.service-grid-two-col li').css( 'opacity', 1 );
														jQuery( '.service-grid-two-col li' ).css('filter','');
												});
										}

										e.preventDefault();

								});

						});

				});

		}

	/* The scripts that depends on scroll event */
	var $is_backtotop_displayed = false;
	var $scroll_position = 0;
	var $flex_caption_opacity = 1;
	var $ratio = 1;

	/* Handles on page load parallex effect */
	perform_parallex_effect();

	jQuery(window).scroll(function () {
		$scroll_position = jQuery(this).scrollTop();

		/* Handles on scroll parallex effect */
		if( $parallex_effect ){
			perform_parallex_effect();
		}

		/* Handles home page flex slider caption opacity */
		$ratio = $scroll_position / jQuery( '#featured .flex-caption' ).outerHeight();
		$flex_caption_opacity = 1 - $ratio;
		if( $flex_caption_opacity <= 1 && $flex_caption_opacity >= 0 ) {
			jQuery( '#featured .flex-caption' ).css( 'opacity', $flex_caption_opacity );
		}/**/

		/* back to top button script */
		if( $scroll_position < 100 && $is_backtotop_displayed ) {

				jQuery('.backtotop').animate({ bottom: '-30px' }, 100);
				$is_backtotop_displayed = false;

		}else if ( $scroll_position > 100 && ! $is_backtotop_displayed ) {

				jQuery('.backtotop').animate({ bottom: '17px' }, 100);
				$is_backtotop_displayed = true;
		}
	});

	// scroll body to 0px on click
	jQuery('.backtotop').click(function () {
		jQuery('html, body').animate({
				scrollTop: 0
		}, 800);
		return false;
	});

});

jQuery(window).load(function($){

	/* Handles responsive menu */
	jQuery("#header #top #toggle-nav").click(function() {
		jQuery("#header #navigation").slideToggle( 'slow' );
		return false;
	});

	jQuery('#navigation .nav li .sub-menu').siblings('.down-arrow').addClass('active-down-arrow');
	adjust_nav_functionality();
	jQuery("#header #navigation li .active-down-arrow").click(function() {
		jQuery(this).siblings(".sub-menu").toggle();
		return false;
	});
});

/**
 *  Adjusts functionality of header navigation
 */
function adjust_nav_functionality() {
	var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	window_width = Math.max( jQuery( window ).width(), innerWidth );
	if( window_width > 1024 ){
		jQuery('#header #main-nav').superfish();
		jQuery('#navigation li .down-arrow-anchor .down-arrow, .active-down-arrow').hide();
		jQuery('#header #navigation').show();
	}else if( window_width <= 1024 ){
		jQuery('#header #main-nav').superfish('destroy');
		jQuery('#navigation li .down-arrow-anchor .down-arrow, .active-down-arrow').show();
		jQuery('#header #navigation').hide();
	}
}

/**
 *  Checkes whether the given element is visible in viewport area
 */
function isElementInViewport(element) {
	if( element ) {
		var rect = element.getBoundingClientRect();

		return ( !!rect
			&& rect.bottom >= 0
			&& rect.right >= 0
			&& rect.top <= jQuery(window).height()
			&& rect.left <= jQuery(window).width()
		);
	}
}

/**
 * Adjust the wrapper margin for the given slide.
 */
function adjust_wrapper_margin( slide, animation_duration ) {
	var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	window_width = Math.max( jQuery( window ).width(), innerWidth );
	var margin_top = 0;

	if ( window_width > 1024 ){
		margin_top = jQuery( '#featured .slide:not(.clone)' ).eq(slide).outerHeight()
		if ( typeof animation_duration !== 'undefined' ) {
			animation_duration = animation_duration;
		}
	} else {
		animation_duration = 100;
	}

	if ( typeof animation_duration === 'undefined' ) {
		animation_duration = 100;
	}

	jQuery( '#wrapper' ).stop().animate( { marginTop: margin_top + 'px' }, animation_duration );
} // End adjust_wrapper_margin()

/**
 * Adjust the height for the current slide based on content
 */
function adjust_slide_height( slide ) {

	var current_height = jQuery( '#featured .slide:not(.clone)' ).eq(slide).outerHeight();
	jQuery( '#featured .flex-viewport' ).css( 'height' , current_height + 'px' );

}

/**
 *  Perform parallex effect
 */
function perform_parallex_effect() {

	var $parallex_effect_item = '';

	if ( jQuery('#home-service #service li').length != 0 )
		$parallex_effect_item = '#home-service #service li';
	if ( jQuery('.service-grid-two-col li').length != 0 )
		$parallex_effect_item = '.service-grid-two-col li';
	if ( jQuery('.feedback .feedback-grid').length != 0 )
		$parallex_effect_item = '.feedback .feedback-grid li';

	if ( $parallex_effect_item != '' ){
		var element_index = 0;
		jQuery($parallex_effect_item).each( function() {

			if ( ( jQuery('html.ie8').length != 0 || window_width <= 600 ) || ( !jQuery(this).hasClass('nice-effect') && ( isElementInViewport( jQuery(this)[0] ))) ){
				jQuery(this).addClass('nice-effect');
				var retain_this = this;
				setTimeout( function(){
					jQuery(retain_this).stop().animate({
						'opacity': 1
					}, 1000, function() {
						if( jQuery('html.ie8').length != 0 ){
							jQuery(retain_this).css('filter','');
							jQuery('.ie8 .home-service .view, .ie8 .service-grid-two-col .view').css( 'position', 'relative' );
							jQuery('.ie8 .home-service .mask, .ie8 .service-grid-two-col .view-more .mask').show();
						}
					});
				}, ( 300 * (element_index + 1) ) );
				element_index++;
			}
		});

		if( jQuery('html.ie8').length != 0 ){
			$parallex_effect = false;
		}
	}
}

}
/*
     FILE ARCHIVED ON 19:11:55 Aug 11, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:42:36 Aug 03, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 2.747
  exclusion.robots: 0.024
  exclusion.robots.policy: 0.012
  esindex: 0.011
  cdx.remote: 24.262
  LoadShardBlock: 391.178 (3)
  PetaboxLoader3.datanode: 361.574 (4)
  PetaboxLoader3.resolve: 168.654 (2)
  load_resource: 178.137
*/