$(function () {
	let amenities = []
	$('input[type='checkbox']').change(function() {
		const id = $(this).attr('data-id');
		const name = $(this).attr('data-name');
		if (this.checked) {
			//amenity_id.append($(this).attr("data-name"))
			amenities.push({name: name, id: id});
			//amenity_id = $('amenities.popover').val();
		}
		else {
			const index = amenities.findIndex(function (d) {
			return d.id === id;
			});
			if (index > -1 ) {
				amenity_id.splice(index, 1);
			}
		}
		const amenityNames = amenities.map(function (d) {
			return d.name.replace(':', '');
		}).join(', ');
		$('.amenities h4').text(amenityNames);
	});

	$.get('http://0.0.0.0:5001/api/v1/places_search/', function(data) {
		if (data.status === 'OK') {
			$('DIV#api_status')addClass('available');
		} else {
			$('DIV#api_status').removeClass('available');
		}
	});
	/*
	$.post('http://0.0.0.0:5001/api/v1/places_search/', {}, function(data) {
		const placeSection = $('section.places');

                        for (const place of data) {
                                const article = `
                                <article>
                                        <div class="title_box">
                                                <h2> ${place.name} </h2>
                                                <div class="price_by_night"> $${place.price_by_night}</div>
                                        </div>
                                        <div class="information">
                                                <div class="max_guest">${place.max_guest} Guest</div>
                                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                                <div class="number_bathrooms">${place.number_bathrooms}</div>
                                        </div>
                                        <div class="description">${place.description}</div>
                                </article>
                                `;
                                placeSection.append(article)
	}).setRequestHeader("Content-Type", "application/json");
	*/
	$.ajax({
		type: "POST",
		url: "http://0.0.0.0:5001/api/v1/places_search/",
		headers: {"Content-Type": "application/json"},
		data: JSON.stringify({}),
		success: function(data) {
			const placeSection = $('section.places');

			for (const place of data) {
				const article = `
				<article>
					<div class="title_box">
						<h2> ${place.name} </h2>
						<div class="price_by_night"> $${place.price_by_night}</div>
					</div>
					<div class="information">
						<div class="max_guest">${place.max_guest} Guest</div>
						<div class="number_rooms">${place.number_rooms} Bedrooms</div>
						<div class="number_bathrooms">${place.number_bathrooms}</div>
					</div>
					<div class="description">${place.description}</div>
				</article>
				`;
				placeSection.append(article)
			}
		}
	});

	$('button').click(function() {
			if($(this).attr('clicked') === 'true') {
				$.ajax({
					type: "POST",
					url: "http://0.0.0.0:5001/api/v1/places_search/",
					headers: {"Content-Type": "application/json"},
					data: JSON.stringify(amenities);
					success: function(data) {
						const placeSection = $('section.places');
						for (const place of data) {
							const article =`
							<article>
								<div class="title_box">
									<h2> ${place.name} </h2>
									<div class="price_by_night"> $${place.price_by_night}</div>
								</div>
								<div class="information">
									<div class="max_guest">${place.max_guest} Guest</div>
									<div class="number_rooms">${place.number_rooms} Bedrooms</div>
									<div class="number_bathrooms">${place.number_bathrooms}</div>
								</div>
								<div class="description">${place.description}</div>
							</article>
							`;
							placeSection.append(article)
						}
					}
				});
			};
	})
});
