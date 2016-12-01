'use strict';

describe('Service: groceries', function () {

  // load the service's module
  beforeEach(module('groceriesList'));

  // instantiate service
  var groceries;
  beforeEach(inject(function (_groceries_) {
    groceries = _groceries_;
  }));

  it('should do something', function () {
    expect(!!groceries).toBe(true);
  });

});
