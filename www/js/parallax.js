var parallaxify = (function() {
	function ParallaxItem(el, multiplier) {
		this.el = el;
		this.multiplier = multiplier;
		this.offsetTop = 0;
	}

	var setCss = (function() {
		var cache = {};

		return function(el, prop, val) {
			var style = el.style;
			
			if ( !(prop in cache) ) {
				if ( prop in style ) {
					cache[prop] = prop;
				}
			}
			style[ cache[prop] ] = val;
		};
	}());

	function calculateOffsets(parallaxItems) {
		var scrollTop = window.pageYOffset;
		parallaxItems.forEach(function(item) {
			
		});
	}

	return function(container) {
		var parallaxItems = Array.prototype.map.call( document.querySelectorAll('[data-parallax]', container), function(item) {
			return new ParallaxItem( item, item.getAttribute('data-parallax') );
		});

	};
}());