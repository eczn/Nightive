// flickr.js
requirejs.config({
	paths: {
		ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
	}
});

require(
	[
		'ramda',
		'jquery'
	],
	function (_, $) {
		var trace = _.curry(function(tag, x) {
			console.log(tag, x);
			return x;
		});
		// app goes here
		main(_, $, trace); 
	}
);

function main(_, $, trace){
	var Impure = {
		getJSON: _.curry((callback, url) => {
			$.getJSON(url, callback);
		}),

		setHtml: _.curry((sel, html) => {
			$(sel).html(html);
		})
	};

	var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
	var srcs = _.compose(_.map(mediaUrl), _.prop('items'));

	var img = url => $('<img />', { src: url });
	

	var url = term => {
		return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
	};

	var renderImages = _.pipe(
		_.pipe(
			srcs,
			_.map(img)
		),
		Impure.setHtml("body"),
	);

	var app = _.pipe(
		url, 
		Impure.getJSON(
			// trace("[Response]")
			renderImages
		)
	);

	app("cats"); 
}
