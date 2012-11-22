var touchScroll = (function() {
	
	return function() {
		var startTouchTop;
		var startScrollTop;

		document.documentElement.style.position = 'relative';
		
		document.addEventListener('touchstart', function(event) {
			startScrollTop = -parseFloat(document.documentElement.style.top) || 0;
			startTouchTop = event.touches[0].screenY;
			event.preventDefault();
		});
		document.addEventListener('touchmove', function(event) {
			var touchOffset = event.touches[0].screenY - startTouchTop;
			// calling actual scroll stuff makes iPad perform CACKLY
			document.documentElement.style.top = -(startScrollTop - touchOffset) + 'px';
			// TODO: trigger regular scroll event, remove positionItems from window object
			positionItems();
			event.preventDefault();
		});
		document.addEventListener('touchend', function(event) {
			event.preventDefault();
		});
	};
}());