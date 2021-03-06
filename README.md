# MultiSlider

Little jQuery plugin allowing various sliders in the same track.
Based on [jQuery UI slider](http://jqueryui.com/demos/slider/).

Check out the demo at http://ippontech.github.com/multiSlider.js/demo/.

## Requirements

- jQuery
- jQuery UI (slider)

## Usage

    $('#timeline').multiSlider();

Or with options argument:

    $('#timeline').multiSlider({ total: 3, min: 0, max: 50 });

### Available options

MultiSlider available options are (almost) the same as those available for [jQuery UI slider](http://jqueryui.com/demos/slider/#options). 

Indeed, the following options behave as expected:

- `disabled`
- `animate`
- `min`
- `max`
- `step`

However, the behavior of the following ones is slightly different:

- `values`: array containing the flattened values (min and max) of each slider. Its length should be an even number.
    
    For example, with two sliders, one with values `[1, 5]`, and second one with `[8, 12]`, `values` would be:

        values: [1, 5, 8, 12]


- `slide`: event triggered on every mouse move during slide. See [jQuery UI documentation](http://jqueryui.com/demos/slider/#event-slide) for more info.

    The function takes the same parameters as the original slide event, with one little difference: `values` contains the flattened values of each slider.

    For example with two sliders:

        slide: function(event, ui) {
          console.log(ui.values);  // -> [1, 5, 8, 12]
        }


Finally, MultiSlider also add the following options:

- `total`: the total number of sliders in the track. This option is ignored if `values` is specified.

### Available methods

MultiSlider allows you to change properties after creation using the following methods:

- `option(name[, value])`: generic method for setting or getting properties. 

    Setter:

        var ms = $('#timeline').multiSlider();
        ms.option('total', 6);
        ms.option('slide', function (event, ui) {});

    Getter:

        var total = ms.option('total');
        var values = ms.option('values');

- `value(index, newValue)`: change a single slider value based on its position in the flattened array of values.

    For example, with two sliders:

        var ms = $('#timeline').multiSlider({ values: [1, 5, 8, 12] });
        ms.value(2, 10);
        var values = ms.option('values');  // -> [1, 5, 10, 12]
