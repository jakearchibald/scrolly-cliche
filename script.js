var applyAlpha = (function() {
	var webKitMaskSupport = 'WebkitMask' in document.body.style;

	return function applyAlpha(colorUrl, alphaSpriteUrl, left, top, done) {
		loadImgs( [colorUrl, alphaSpriteUrl], function(imgs) {
			var color = imgs[0];
			var alphaSprite = imgs[1];

			if ( webKitMaskSupport ) {
				color.style.WebkitMask = 'url("' + alphaSpriteUrl + '") no-repeat -' + left + 'px -' + top + 'px';
				done(color);
			}
		});
	};
}());

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

applyAlpha('car.jpg', 'masks.png', 0, 0, function(img) {
	document.body.appendChild(img);
});