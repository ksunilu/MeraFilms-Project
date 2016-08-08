'use strict';

(function(){

class PrintComponent {
  constructor($http, $scope, $routeParams, $location, $rootScope ,socket)  {
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.socket = socket;
    //GET DATA FROM $rootScope
    this.dirtyBooking = $rootScope.dirtyBooking;
    this.showData = $rootScope.bookingShowData;
    this.selectedBooking = {};
    this.seatsTaken = false;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('print');
    });
  }// end constructor
  $onInit() {
    this.$http.get('/api/bookings/' + this.dirtyBooking._id)
      .then(response => {
        this.selectedBooking = response.data;
        // this.socket.syncUpdates('booking', this.selectedBooking);
        //CHECK IF SSEAT ALLREADY TAKEN BY OTHER USER
        this.seatsTaken = this.CheckSeatsTakenAway();
      });
  }// end $onInit

  finalizeBooking()
  {//THIS RUNS WHEN SOMEONE CLICKS
    if( ! this.seatsTaken )
    {
          this.markSeatTakenAway();
          this.$http.put('/api/bookings/' + this.dirtyBooking._id,
              angular.toJson(this.dirtyBooking)
              // JSON.stringify(this.dirtyBooking)
          );
    }
    this.$location.path('/');
  }

  CheckSeatsTakenAway()
  {
      var row, rowPure;

      for(var i=0; i < this.dirtyBooking.seatPlan.rows.length; i++)
      {
        row = this.dirtyBooking.seatPlan.rows[i];
        rowPure = this.selectedBooking.seatPlan.rows[i];

        for(var j=0; j < row.payment_id.length; j++)
        {
          if(row.payment_id[j]=== '-1'  &&  rowPure.payment_id[j] !== '0')
          {
            return true;
          }
        }
      }
      return false;
  }
  markSeatTakenAway()
  {
      var row;

      for(var i=0; i < this.dirtyBooking.seatPlan.rows.length; i++)
      {
        row = this.dirtyBooking.seatPlan.rows[i];
        for(var j=0; j < row.payment_id.length; j++)
        {
          if(row.payment_id[j]=== '-1'  )
          {
            row.payment_id[j]= '1';
          }
        }
      }
  }

}// end class PrintComponent

angular.module('meraFilmsApp')
  .component('print', {
    templateUrl: 'app/print/print.html',
    controller: PrintComponent
  });

})();
