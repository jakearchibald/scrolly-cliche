var parallaxify = (function() {
	function ParallaxItem(el, multiplier, colorUrl) {
		this.el = el;
		this.multiplier = Number(multiplier);
		this.colorUrl = colorUrl;
		this.colorNeeded = !!colorUrl;
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
		// calculate correct position
		var posInView = item.top + (item.height / 2) - viewTop;
		var offsetFromCenter = posInView - (windowHeight / 2);
		var desiredOffset = offsetFromCenter * item.multiplier;
		var translateOffset = Math.floor( desiredOffset - offsetFromCenter );
		
		var itemTop = item.top + translateOffset;
		var itemBottom = itemTop + item.height;
		var viewBottom = viewTop + windowHeight;

		// avoid changing position unless it's in view
		// TODO: test if this is a worthwhile optimisation
		if ( itemBottom > viewTop && itemTop < viewBottom ) {
			setCss( item.el, 'transform', 'translate(0, ' + translateOffset + 'px)' );
		}
	}

	return function() {
		var parallaxItems = Array.prototype.map.call( document.querySelectorAll('[data-parallax]'), function(item) {
			return new ParallaxItem( item, item.getAttribute('data-parallax'), item.getAttribute('data-color-href') );
		});

		var windowHeight = window.innerHeight;

		function positionItems() {
			var viewTop = window.pageYOffset;

			for ( var i = parallaxItems.length; i--; ) {
				positionItem( parallaxItems[i], windowHeight, viewTop );
			}
		}

		window.addEventListener('resize', function() {
			windowHeight = window.innerHeight;
			calculateInitialOffsets(parallaxItems);
			positionItems();
		});

		window.addEventListener('scroll', positionItems);
		calculateInitialOffsets(parallaxItems);
		positionItems();
	};
}());