// MultiSlider.js, multiple sliders in the same track.
// Version 0.1
// (c) 2012 [Ippon Technologies](www.ippon.fr)
// Released under the MIT license
// https://github.com/ippontech/multiSlider.js
(function ($) {

  var overlap = function (element, value, onLeft) {
    if (!element) return false;
    var boundaryValue = element.slider('option', 'values')[onLeft ? 1 : 0];
    return onLeft ? value < boundaryValue : value > boundaryValue;
  };

  var createDefaultValues = function (options) {
    var length = Math.floor((options.max - options.min) / options.total),
        values = [],
        v = options.min;

    for (; v < options.max; v += length) {
      values.push(v + options.step, v + length - options.step);
    }

    return values;
  };

  function MultiSlider(element, options) {
    this.element = element;
    this.options = options;
    if (!this.options.values) {
      this.options.values = createDefaultValues(options);
    }
    this._createSliders();
  }

  MultiSlider.prototype = {

    _createSliders: function () {
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
        values = o.values;

      var element = $('<div/>')
        .css('position', 'absolute')
        .width(self.element.width())
        .appendTo(self.element);

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

    _updateValues: function (index, sliderValues) {
      this.options.values[2 * index] = sliderValues[0];
      this.options.values[2 * index + 1] = sliderValues[1];
    },

    _slideHandler: function (event, ui, element) {
      if (overlap(element.prev(), ui.values[0], true) || overlap(element.next(), ui.values[1], false)) {
        return false;
      }

      this._updateValues(element.index(), ui.values);

      if (this.options.slide) {
        var newUi = $.extend({}, ui, { values: this.options.values });
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
        this.options.values = createDefaultValues(this.options);
        this._createSliders();
      }
      else if (name == 'values') {
        this._createSliders();
      }
    },

    value: function (index, v) {
      var sliderElement = this.element.children(':eq(' + Math.floor(index / 2) + ')');
      if (!sliderElement) {
        return false;
      }

      v = +v;
      if (this.options.values[index - 1] > v || this.options.values[index + 1] < v) {
        return false;
      }

      var sliderValues = sliderElement.slider('option', 'values');
      sliderValues[index % 2] = v;
      sliderElement.slider('option', 'values', sliderValues);

      this.options.values[index] = v;
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