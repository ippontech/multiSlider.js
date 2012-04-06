$(function() {

  // Demo 1
  $('#demo-1').multiSlider({total: 2});

  // Demo 2
  var demo2Slider = $('#demo-2').multiSlider({total: 1});
  
  $('#demo-2-select').change(function () {
    demo2Slider.option('total', $(this).val());
  });
    
});