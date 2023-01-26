$(function () {
	let amenity_id = []
	$('input[type='checkbox']').change(function() {
		if (this.checked) {
			//amenity_id.append($(this).attr("data-name"))
			amenity_id.push($(this).attr("data-name"))
			//amenity_id = $('amenities.popover').val();
		}
		else {
			var index = amenity_id.indexOf($(this).attr("data-name"));
			amenity_id.splice(index, 1);
		}
		let amenity = amenity_id.join(', ');
		$('.amenities h4').text(amenity)
	});
	//let amenity = amenity_id.join(', ');
	//$('.amenities h4').text(amenity)
});


