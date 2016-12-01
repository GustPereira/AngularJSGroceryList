'use strict';

describe('Service: baseUrl', function () {

  // load the service's module
  beforeEach(module('groceriesList'));

  // instantiate service
  var baseUrl;
  beforeEach(inject(function (_baseUrl_) {
    baseUrl = _baseUrl_;
  }));

  it('should do something', function () {
    expect(!!baseUrl).toBe(true);
  });

});
