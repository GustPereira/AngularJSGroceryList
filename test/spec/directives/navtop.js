'use strict';

describe('Directive: navTop', function () {

  // load the directive's module
  beforeEach(module('groceriesList'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-top></nav-top>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navTop directive');
  }));
});
