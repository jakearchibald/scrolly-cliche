var touchScroll = (function() {
	
	return function() {
	};
}());

var touchScroll = {
	init: function() {
		var startTouchTop;
		var startScrollTop;

		document.documentElement.style.position = 'relative';
		
		document.addEventListener('touchstart', function(event) {
			startScrollTop = touchScroll.scrollTop;
			startTouchTop = event.touches[0].screenY;
			event.preventDefault();
		});
		document.addEventListener('touchmove', function(event) {
			var touchOffset = event.touches[0].screenY - startTouchTop;
			// calling actual scroll stuff makes iPad perform CACKLY
			touchScroll.scrollTop = startScrollTop - touchOffset;
			// TODO: test this vs translate
			document.documentElement.style.top = -touchScroll.scrollTop + 'px';
			window.dispatchEvent( new CustomEvent('touchscroll') );
			event.preventDefault();
		});
		document.addEventListener('touchend', function(event) {
			event.preventDefault();
		});
	},
	scrollTop: 0
};