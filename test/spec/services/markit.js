'use strict';

describe('Service: Markit', function () {

  // load the service's module
  beforeEach(module('aktienApp'));

  // instantiate service
  var Markit;
  beforeEach(inject(function (_Markit_) {
    Markit = _Markit_;
  }));

  it('should do something', function () {
    expect(!!Markit).toBe(true);
  });

});
