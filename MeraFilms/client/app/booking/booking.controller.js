'use strict';

(function(){

class BookingComponent {
  constructor($http, $scope, $routeParams, $rootScope ,socket) {
    this.selectedBooking = {};
    this.selectedMovie ={};
    this.showData = {};
    this.showData.selected='';
    this.showData.selectTotal=0;
    this.showData.selectedCount=0;
    this.showData.selectedMovieImg ='';
    this.paramsID = $routeParams.id;
    this.showData.otherCharges = 115;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('booking');
    });
  }// end constructor


  $onInit() {
    this.$http.get('/api/bookings/' + this.paramsID)
      .then(response => {
        this.selectedBooking = response.data;
        this.socket.syncUpdates('booking', this.selectedBooking);
        this.getMovie(this.selectedBooking.imdbID);
      });

  }// end $onInit
  getMovie(imdbID)
  {
    this.$http.get('/api/movies/' + imdbID)
      .then(response => {
        this.selectedMovie = response.data;
        this.socket.syncUpdates('booking', this.selectedMovie);
      });
  }
  seatVisible(row, index)
  {
      // return ( row.s[index] !== null  &&   parseInt(row.payment_id[index]) < 2 ) ;
      return ( row.s[index] !== null ) ;
  }
  seatVisibleBar(row, index)
  {
      return ( row.s[index] !== null  &&   parseInt(row.payment_id[index]) > 0 ) ;
  }

  selectSeats()
  {
      var row, lselected = [], lcount=0;

      for(var i=0; i < this.selectedBooking.seatPlan.rows.length ; i++)
      {
        row = this.selectedBooking.seatPlan.rows[i];
        for(var j=0; j < row.payment_id.length; j++)
        {
          if(row.payment_id[j]=== '-1')
          {
            lselected[lselected.length] = (row.rn + row.s[j]);
            lcount++;
          }
        }
      }
      this.showData.selected = lselected.join();
      this.showData.selectedCount = lcount;
      this.showData.selectTotal =  parseFloat(this.selectedBooking.seatPlan.price) * lcount + this.showData.otherCharges;
  }

  markSeat(row, index)
  {
      if(row.payment_id[index] === '0' )
      {row.payment_id[index] = '-1' ;}
      else if(row.payment_id[index] === '-1' )
      {  row.payment_id[index] = '0' ;}

      this.$rootScope.dirtyBooking = this.selectedBooking;
      this.$rootScope.bookingShowData = this.showData;
      this.selectSeats();
      // this.$rootScope.dirtyBooking = JSON.parse(JSON.stringify(this.selectedBooking));
  }

  getSeatClass(row, index)
  {
    if( row.payment_id[index] === '0' )
    {
       return 'btn-circle btn-success';
     }
    else if( parseInt(row.payment_id[index]) > 0)
    {

      return 'btn-circle btn-danger';
    }
    else
    {
      return 'btn-circle btn-info';
    }
  }

}// end class BookingComponent

angular.module('meraFilmsApp')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent
  });

})();
