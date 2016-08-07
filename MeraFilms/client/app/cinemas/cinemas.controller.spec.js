'use strict';

describe('Component: CinemasComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var CinemasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CinemasComponent = $componentController('cinemas', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
