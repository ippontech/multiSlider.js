# MultiSlider

Little jQuery plugin allowing various sliders in the same line.
Based on [jQuery UI slider][1].

## Requirements

- jQuery
- jQuery UI (slider)

## Usage
    
    $('#timeline').multiSlider();
    $('#timeline').multiSlider({total: 3, values: [1, 3, 5, 7, 10, 16]});

### Available options

    var defaults = {
      total: 2,
      min: 0,
      max: 24,
      values: {
        1: [8.5, 19],
        2: [8.5, 13, 14, 19],
        3: [3, 8, 9, 13, 14, 19]
      }
    };

[1]: http://jqueryui.com/demos/slider/