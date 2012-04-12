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
  var demo3Slider = $('#demo-3').multiSlider({total: 1});
  
  $('#demo-3-select').change(function () {
    demo3Slider.option('total', $(this).val());
  });
  
  // Demo 4
  var demo4Slider = $('#demo-4').multiSlider({total: 2});

  demo4Slider.option('slide', function (event, ui) {
    $('input.input').each(function (index) {
      $(this).val(ui.values[index]);
    });
  });

  $('input.input').change(function () {
    var $input = $(this);
    demo4Slider.value($input.index(), $input.val());
  });

});