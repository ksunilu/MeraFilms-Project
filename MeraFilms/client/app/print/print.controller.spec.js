'use strict';

describe('Component: PrintComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var PrintComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PrintComponent = $componentController('print', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
