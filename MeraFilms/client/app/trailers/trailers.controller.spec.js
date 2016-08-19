'use strict';

describe('Component: TrailersComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var TrailersComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TrailersComponent = $componentController('trailers', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
