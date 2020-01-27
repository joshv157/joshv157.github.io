let image_sets = [7, 13, 2, 7];

function initialize() {
	$('#home-button').each(function(){
		$(this).click(function(e){
			e.preventDefault();
			$('html,body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});
	});

	for (let i = image_sets.length - 1; i >= 0; i--) {
		let carousel = createCarousel(i);
		let carousel_inner = $('<div class="carousel-inner"></div>');

		for (let j = 0; j < image_sets[i]; j++) {
			addImage("images/" + (i+1).toString() + "/" + j.toString(), carousel_inner, j === 0);
		}

		carousel.prepend(carousel_inner);

		let list_item = $('<li class="row justify-content-center no-gutters"></li>');
		list_item.append(carousel);
		$('#image-list').append(list_item);
	}
}

function addImage(image, carousel, first) {
	let img_tag = $(`<img class="carousel-image" src="${image}" alt="${image}">`);

	let carousel_item = $('<div></div>');
	if (first) carousel_item.attr('class', 'carousel-item active');
	else carousel_item.attr('class', 'carousel-item');

	carousel_item.append(img_tag);
	carousel.append(carousel_item);
}

function createCarousel(num) {
	let carousel = $(`<div class="carousel slide col-md-6" id="carousel-${num}" data-ride="carousel" data-touch="true" data-interval="false"></div>`);

	carousel.append($(" <a class=\"carousel-control-prev\" href=\"#carousel-" + num + "\"role=\"button\" data-slide=\"prev\">\n" +
		"    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n" +
		"    <span class=\"sr-only\">Previous</span>\n" +
		"  </a>\n" +
		"  <a class=\"carousel-control-next\" href=\"#carousel-" + num + "\"role=\"button\" data-slide=\"next\">\n" +
		"    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n" +
		"    <span class=\"sr-only\">Next</span>\n" +
		"  </a>"));

	return carousel;
}

$(document).ready(initialize);