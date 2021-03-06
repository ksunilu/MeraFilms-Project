'use strict';

(function(){

class PrintComponent {
  constructor($http, $scope, $routeParams, $location, $rootScope ,socket)  {
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.socket = socket;
    this.dirtyBooking = $rootScope.dirtyBooking;
    this.showData = $rootScope.bookingShowData;
    this.selectedBooking = {};
    this.seatsTaken = false;
    $scope.$on('$destroy', function() {
      this.dirtyBooking = {};
      this.showData = {};
      socket.unsyncUpdates('print');
    });
  }// end constructor
  $onInit() {
    this.$http.get('/api/bookings/' + this.dirtyBooking._id)
      .then(response => {
        this.selectedBooking = response.data;
      });
  }// end $onInit
  goHome()
  {
      this.$location.path('/');
  }

  finalizeBooking()
  {

        if( ! (this.seatsTaken = this.CheckSeatsTakenAway()) )
        {
              this.markSeatTakenAway();
              this.$http.put('/api/bookings/' + this.dirtyBooking._id, angular.toJson(this.dirtyBooking))
              .then(response => {
                this.$rootScope.dirtyBooking ={};
                this.$rootScope.bookingShowData={};
              });
        }
        else {
          alert('Seats Taken away initiate refund process')
        }
        this.goHome();
  }

  CheckSeatsTakenAway()
  {
      var rowDirty, rowPure;
      for(var i=0; i < this.dirtyBooking.seatPlan.rows.length; i++)
      {
        rowDirty = this.dirtyBooking.seatPlan.rows[i];
        rowPure = this.selectedBooking.seatPlan.rows[i];
        for(var j=0; j < rowDirty.payment_id.length; j++)
        {
          if(rowDirty.payment_id[j]=== '-1'  &&  rowPure.payment_id[j] === '1')
          {
            this.seatsTaken = true;
            return true;
          }
        }
      }
      this.seatsTaken = false;
      return false;
  }
  markSeatTakenAway()
  {
      var rowDirty;
      for(var i=0; i < this.dirtyBooking.seatPlan.rows.length; i++)
      {
        rowDirty = this.dirtyBooking.seatPlan.rows[i];
        for(var j=0; j < rowDirty.payment_id.length; j++)
        {
          if(rowDirty.payment_id[j]=== '-1'  )
          {
            rowDirty.payment_id[j]= '1';
          }
        }
      }
      return 1;
  }
}// end class PrintComponent

angular.module('meraFilmsApp')
  .component('print', {
    templateUrl: 'app/print/print.html',
    controller: PrintComponent
  });

})();
