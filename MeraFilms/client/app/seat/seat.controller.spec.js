'use strict';

describe('Component: SeatComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var SeatComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SeatComponent = $componentController('seat', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
