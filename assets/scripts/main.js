var loadGrav = function(email, options) {
	var gravatarContainer = $('#grav-container');
	var gravatarUrlContainer = $('#grav-url');
	var emailContainer = $('#grav-email');
	
	gravatarContainer.html("");
	gravatarUrlContainer.html("");

	var errors = false;

	if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
		emailContainer.addClass("invalid");
		errors = true;
	} else {
		emailContainer.removeClass("invalid");
	}


	if (!errors) {
		gravatarGetter.getGravatarURL(email, options, function(err, url) {
			if (err) {
				return;
			}

			var newImg = document.createElement("img");
			newImg.src = url;

			var newLink = document.createElement("a");
			newLink.href = url;
			$(newLink).html(url);

			gravatarContainer.html(newImg);
			gravatarUrlContainer.html(newLink);
		});
	}
}

$(document).ready(function() {
	$('#show-extra').click(function() {
		$(this).parent().next().fadeToggle();
	});

	$('#get-grav').click(function() {
		var emailContainer = $('#grav-email');
		var sizeContainer = $('#grav-size');	
		var ratingContainer = $('#grav-rating');

		var email = emailContainer.val();
		var rating = ratingContainer.val();
		var size = sizeContainer.val();

		var options = {};

		if (size != "") {
			options.size = size;
		}

		if (rating != "") {
			options.rating = rating;
		}

		loadGrav(email, options);

	});
});