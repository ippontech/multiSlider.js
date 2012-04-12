// MultiSlider.js, multiple sliders in the same row.
// Version 0.1
// (c) 2012 [Ippon Technologies](www.ippon.fr)
// Released under the MIT license
(function ($) {

  var overlap = function (element, value, onLeft) {
    if (!element) return false;
    var boundaryValue = element.slider('option', 'values')[onLeft ? 1 : 0];
    return onLeft ? value < boundaryValue : value > boundaryValue;
  };

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
        values.push(this.sliders[i].slider('values', 0), this.sliders[i].slider('values', 1));
      };
      return values;
    },

    _setValues: function (index, values) {
      var s = this.sliders[index];
      s.slider('values', 0, values[0]);
      s.slider('values', 1, values[1]);
    },

    _createDefaultValues: function () {
      var o = this.options,
          length = Math.floor((o.max - o.min) / o.total),
          values = [];

      for (var v = o.min; v < o.max; v += length) {
        values.unshift(v + o.step, v + length - o.step);
      };
      return values;
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
        values = self._createDefaultValues();

      var element = $('<div/>')
        .css('position', 'absolute')
        .width(self.element.width())
        .prependTo(self.element);

      // Get options from `sliderDefaults`, then extend them with global `options`,
      // then with specific implementation for `values` and `slide`.
      var sliderOptions = $.extend({}, sliderDefaults, o, {
        values: [values[index * 2], values[index * 2 + 1]],
        slide: function (event, ui) {
          // Here, `this` refers to a slider element.
          return self._slideHandler.call(self, event, ui, $(this));
        }
      });

      element.slider(sliderOptions);

      return element;
    },

    _slideHandler: function (event, ui, element) {
      if (overlap(element.prev(), ui.values[0], true) || overlap(element.next(), ui.values[1], false)) {
        return false;
      }

      this._setValues(element.index(), ui.values);
      if (this.options.slide) {
        var newUi = $.extend({}, ui, { values: this._getValues() });
        this.options.slide(event, newUi);
      }
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
    step: 1
  };

  // Big fat jQuery plugin
  $.fn.multiSlider = function (options) {
    options = $.extend({}, defaults, options);
    return new MultiSlider(this, options);
  };

})(jQuery);

