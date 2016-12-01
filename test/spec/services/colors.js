'use strict';

describe('Service: colors', function () {

  // load the service's module
  beforeEach(module('groceriesList'));

  // instantiate service
  var colors;
  beforeEach(inject(function (_colors_) {
    colors = _colors_;
  }));

  it('should do something', function () {
    expect(!!colors).toBe(true);
  });

});
