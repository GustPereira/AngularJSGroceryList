'use strict';

describe('Service: redirect', function () {

  // load the service's module
  beforeEach(module('groceriesList'));

  // instantiate service
  var redirect;
  beforeEach(inject(function (_redirect_) {
    redirect = _redirect_;
  }));

  it('should do something', function () {
    expect(!!redirect).toBe(true);
  });

});
