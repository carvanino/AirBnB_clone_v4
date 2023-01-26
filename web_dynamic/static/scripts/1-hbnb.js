$(function () {
  let amenities = [];
  $('input[type="checkbox"]').change(function () {
    const id = $(this).attr("data-id");
    const name = $(this).attr("data-name");
    if (this.checked) {
      //amenity_id.append($(this).attr("data-name"))
      amenities.push({ name: name, id: id });
      //amenity_id = $('amenities.popover').val();
    } else {
      var index = amenities.findIndex(function (d) {
        return d.id === id;
      });
      if (index != -1) {
        amenities.splice(index, 1);
      }
    }
    let amenity = amenities
      .map(function (d) {
        return d.name.replace(":", "");
      })
      .join(", ");
    $(".amenities h4").text(amenity);
  });
  //let amenity = amenity_id.join(', ');
  //$('.amenities h4').text(amenity)
});
