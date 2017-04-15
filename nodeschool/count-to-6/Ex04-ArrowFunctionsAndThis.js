// Ex04-ArrowFunctionsAndThis.js

var foot = {
	kick: function () {
		this.yelp = "Ouch!";
		setImmediate(() => {
			console.log(this.yelp);
		});
	}
};

foot.kick();