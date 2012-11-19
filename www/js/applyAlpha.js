var applyAlpha = (function() {
	function loadImgs(urls, doneCallback) {
		var remaining = urls.length;
		var imgs = [];

		function imgLoad() {
			if (!--remaining) {
				doneCallback(imgs);
			}
		}

		urls.forEach(function(url) {
			var img = new Image();
			imgs.push(img);
			img.onload = imgLoad;
			img.src = url;
		});
	}

	var webKitMaskSupport = 'WebkitMask' in document.body.style;

	return function applyAlpha(colorUrl, alphaSpriteUrl, left, top, done) {
		loadImgs( [colorUrl, alphaSpriteUrl], function(imgs) {
			var color = imgs[0];
			var alphaSprite = imgs[1];

			if ( webKitMaskSupport ) {
				color.style.WebkitMask = 'url("' + alphaSpriteUrl + '") no-repeat -' + left + 'px -' + top + 'px';
				done(color);
				return;
			}

			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			var width = color.width;
			var height = color.height;
			canvas.width = width;
			canvas.height = height;
			context.drawImage(alphaSprite, left, top, width, height, 0, 0, width, height);
			context.globalCompositeOperation = 'source-atop';
			context.drawImage(color, 0, 0);
			done(canvas);
		});
	};
}());