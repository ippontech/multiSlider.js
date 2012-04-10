// MultiSlider.js, multiple sliders in the same row.
// Version 0.1
// (c) 2012 [Ippon Technologies](www.ippon.fr)
// Released under the MIT license
(function ($) {

  function MultiSlider(element, options) {
    this.element = element;
    this.options = options;
    this.sliders = this._newSliders();
    this.values = this._getValues();
  }

  MultiSlider.prototype = {

    _getValues: function () {
      var values = [];
      for (var i = this.sliders.length - 1; i >= 0; i--) {
        values.unshift(this.sliders[i].slider('values', 0), this.sliders[i].slider('values', 1));
      };
      return values;
    },

    _setValues: function (index, values) {
      var s = this.sliders[index];
      s.slider('values', 0, values[0]);
      s.slider('values', 1, values[1]);
    },

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

      // Get options from `sliderDefaults`, then extend them with global `options`,
      // then with specific implementation for `values` and `slide`.
      var sliderOptions = $.extend({}, sliderDefaults, o, {
        values: [values[index * 2], values[index * 2 + 1]],
        slide: function (event, ui) {
          return self._slideHandler.call(self, event, ui, index);
        }
      });

      element.slider(sliderOptions);

      return element;
    },

    _slideHandler: function (event, ui, index) {
      if (ui.values[0] < this.leftBoundary(index) || ui.values[1] > this.rightBoundary(index)) {
        return false;
      }

      this._setValues(index, ui.values);
      if (this.options.slide) {
        var newUi = $.extend({}, ui, { values: this._getValues() });
        this.options.slide(event, newUi);
      }
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

  var sliderDefaults = {
    range: true
  };

  var defaults = {
    total: 2,
    min: 0,
    max: 24,
    step: 1,
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

