$(function () {
  const amenities = [];
  const states = [];
  const cities = [];

  $('input[type="checkbox"]').change(function () {
    const data = $(this).data();
    const id = data.id;
    const name = data.name;
    const type = (data.type || '').toLowerCase();

    let target;
    switch (type) {
      case 'state':
        target = states;
        break;
      case 'city':
        target = cities;
        break;
      case 'amenity':
        target = amenities;
        break;
    }
    if (this.checked) {
      target.push({ name: name, id: id });
    } else {
      const index = target.findIndex(function (d) {
        return d.id === id;
      });
      if (index !== -1) {
        target.splice(index, 1);
      }
    }
    if (type === 'amenity') {
      const itemNames = amenities
        .map(function (d) {
          return d.name.replace(':', '');
        })
        .join(', ');
      $('.amenities h4').text(itemNames);
    } else {
      const stateNames = states.map(function (d) {
        return d.name.replace(':', '');
      });
      const cityNames = cities.map(function (d) {
        return d.name.replace(':', '');
      });
      $('.locations h4').text(stateNames.concat(cityNames).join(', '));
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    method: 'GET',
    success: function (data) {
      if (data.status.toLowerCase() === 'ok') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $('button').on('click', function (e) {
    const placeSection = $('section.places');
    const amenityIds = amenities.map(function (d) {
      return d.id.replace(':', '');
    });
    const stateIds = states.map(function (d) {
      return d.id.replace(':', '');
    });
    const cityIds = cities.map(function (d) {
      return d.id.replace(':', '');
    });
    placeSection.empty();
    placesSearch({ amenities: amenityIds, states: stateIds, cities: cityIds });
  });

  placesSearch();
});

const placesSearch = function (query) {
  query = query || {};
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(query),
    dataType: 'json',
    success: function (data) {
      const placeSection = $('section.places');

      for (const place of data) {
        const article = `
                <article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">
                    ${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}
                    </div>
                    <div class="number_rooms">
                    ${place.number_rooms} Bedroom${
          place.number_rooms > 1 ? 's' : ''
        }
                    </div>
                    <div class="number_bathrooms">
                    ${place.number_bathrooms} Bathroom${
          place.number_bathrooms > 1 ? 's' : ''
        }
                    </div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
              </article>
              `;
        placeSection.append(article);
      }
    }
  });
};
