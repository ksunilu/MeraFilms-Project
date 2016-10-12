'use strict';

describe('Component: ShowingComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var ShowingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ShowingComponent = $componentController('showing', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
