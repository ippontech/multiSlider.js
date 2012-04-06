// MultiSlider, multiple sliders in the same row.
// Version 0.1
// (c) 2012 [Ippon Technologies](www.ippon.fr)
// Released under the MIT license
(function ($) {

  function MultiSlider(element, options) {
    this.element = element;
    this.options = options;
    this.sliders = this._newSliders();
  }

  MultiSlider.prototype = {

    _newSliders: function () {
      // Remove existing sliders if any.
      this.reset();

      // Add sliders.
      var sliders = [], i = 0;
      for (; i < this.options.total; i++) {
        sliders.push(this._newSlider(i));
      }
      
      return sliders;
    },

    _newSlider: function (index) {
      var self = this,
        o = self.options,
        values = o.values[o.total];

      var element = $('<div/>')
        .css('position', 'absolute')
        .width(self.element.width())
        .appendTo(self.element);
    
      var sliderOptions = getSliderOptions(o.min, o.max, values[index * 2], values[index * 2 + 1]);

      sliderOptions.slide = function (event, ui) {
        return ui.values[0] >= self.leftBoundary(index) && ui.values[1] <= self.rightBoundary(index);
      };

      element.slider(sliderOptions);

      return element;
    },

    leftBoundary: function (index) {
      var element = this.sliders[index - 1];
      return element ? element.slider('option', 'values')[1] : this.options.min;
    },

    rightBoundary: function (index) {
      var element = this.sliders[index + 1];
      return element ? element.slider('option', 'values')[0] : this.options.max;
    },

    option: function (name, value) {
      // Can be used as a getter if `value` is omitted.
      if (value === undefined) {
        return this.options[name];
      }

      // Skip if the new value hasn't changed.
      if (this.options[name] === value) {
        return this;
      }

      this.options[name] = value;

      if (name == 'total') {
        this.sliders = this._newSliders();
      }
    },

    reset: function () {
      this.element.html('');
    }

  };

  var getSliderOptions = function (minValue, maxValue, startValue, endValue) {
    return {
      range: true,
      step: .5,
      min: minValue,
      max: maxValue,
      values: [startValue, endValue]
    };
  };

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

  // Big fat jQuery plugin
  $.fn.multiSlider = function (options) {
    options = $.extend({}, defaults, options);
    return new MultiSlider(this, options);
  };

})(jQuery);

