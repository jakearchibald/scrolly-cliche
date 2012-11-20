var parallaxify = (function() {
	function ParallaxItem(el, multiplier, colorUrl) {
		this.el = el;
		this.multiplier = Number(multiplier);
		this.colorUrl = colorUrl;
		this.colorTriggered = false;
		this.top = 0;
		this.height = 0;
	}

	var setCss = (function() {
		var cache = {};
		var prefixes = ['Webkit', 'Moz', 'Ms', 'O'];

		return function(el, prop, val) {
			var style = el.style;
			
			if ( !(prop in cache) ) {
				if ( prop in style ) {
					cache[prop] = prop;
				}

				var propUpper = prop.charAt(0).toUpperCase() + prop.slice(1);
				var propTest;

				for (var i = 0, len = prefixes.length; i < len; i++) {
					propTest = prefixes[i] + propUpper;
					if ( propTest in style ) {
						cache[prop] = propTest;
						break;
					}
				}
			}
			style[ cache[prop] ] = val;
		};
	}());

	function calculateInitialOffsets(parallaxItems) {
		var scrollTop = window.pageYOffset;
		parallaxItems.forEach(function(item) {
			setCss( item.el, 'transform', '' );
			item.top = item.el.getBoundingClientRect().top + scrollTop;
			item.height = item.el.offsetHeight;
		});
	}

	function positionItem(item, windowHeight, viewTop) {
		var itemBottom = item.top + item.height;
		var viewBottom = viewTop + windowHeight;
		
		// Is the item within the viewport
		// TODO: we need to cater for the multiplier here (for when it's < 1)
		if ( itemBottom > viewTop && item.top < viewBottom ) {
			var posInView = item.top - viewTop;
			var offsetFromCenter = posInView - (windowHeight / 2);
			var desiredOffset = offsetFromCenter * item.multiplier;
			var translateOffset = desiredOffset - offsetFromCenter;
			setCss( item.el, 'transform', 'translate(0, ' + translateOffset + 'px)' );
		}
	}

	return function(container) {
		var parallaxItems = Array.prototype.map.call( document.querySelectorAll('[data-parallax]', container), function(item) {
			return new ParallaxItem( item, item.getAttribute('data-parallax'), item.getAttribute('data-color-href') );
		});

		calculateInitialOffsets(parallaxItems);

		var windowHeight = window.innerHeight;

		window.addEventListener('resize', function() {
			windowHeight = window.innerHeight;
		});

		window.addEventListener('scroll', function() {
			var viewTop = window.pageYOffset;

			for ( var i = parallaxItems.length; i--; ) {
				positionItem( parallaxItems[i], windowHeight, viewTop );
			}
		});

		// todo: caluclate offsets
		// scroll listener

	};
}());