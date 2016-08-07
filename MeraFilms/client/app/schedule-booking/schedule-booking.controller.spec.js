'use strict';

describe('Component: ScheduleBookingComponent', function () {

  // load the controller's module
  beforeEach(module('meraFilmsApp'));

  var ScheduleBookingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ScheduleBookingComponent = $componentController('schedule-booking', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
