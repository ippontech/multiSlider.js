$(function() {

  // Demo 1
  $('#demo-1').multiSlider({total: 2});

  // Demo 2
  $('#demo-2').multiSlider({
    total: 2,
    slide: function (event, ui) {
      $('#demo-2-values').html(ui.values.join(', '));
    }
  });

  // Demo 3
  var demo2Slider = $('#demo-3').multiSlider({total: 1});
  
  $('#demo-3-select').change(function () {
    demo2Slider.option('total', $(this).val());
  });
    

/*multiSlider.option('slide', function (event, ui) {
  $('#demo-3-values').html(formatTimeDisplay(ui.values));
});*/
});