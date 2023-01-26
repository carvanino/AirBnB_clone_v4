$(function () {
  const amenities = [];
  $('input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (this.checked) {
      amenities.push({ name: name, id: id });
    } else {
      const index = amenities.findIndex(function (d) {
        return d.id === id;
      });
      if (index !== -1) {
        amenities.splice(index, 1);
      }
    }
    const amenityNames = amenities
      .map(function (d) {
        return d.name.replace(':', '');
      })
      .join(', ');
    $('.amenities h4').text(amenityNames);
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
});
