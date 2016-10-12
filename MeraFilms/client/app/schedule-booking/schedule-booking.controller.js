'use strict';

(function(){

class ScheduleBookingComponent {

  constructor($http, $scope, socket) {
    this.allMovies = [];
    this.allCinemas = [];
    this.allBookings = [];

    this.booking = {};
    this.showData = {};

    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('schedule-booking');
    });
  }//end constructor

  //get initial data
  $onInit() {
    this.getMoviesTheaters();
    this.getAllBookings();

  }// end $onInit

    getAllBookings()
    {
      this.$http.get('/api/bookings')
        .then(response => {
          this.allBookings = response.data;
          this.socket.syncUpdates('schedule-booking', this.allBookings);
        });
    }

    getMoviesTheaters()
    {
          this.$http.get('/api/movies')
                .then(response => {
                  this.allMovies = response.data;
                  this.socket.syncUpdates('schedule-booking', this.allMovies);
                });

          this.$http.get('/api/cinemass')
                .then(response => {
                  this.allCinemas = response.data;
                  this.socket.syncUpdates('schedule-booking', this.allCinemas);
                });
    }

    selectMovie()
    {
        this.showData.Poster = this.allMovies[this.showData.movie_i].Poster;
        this.socket.syncUpdates('schedule-booking', this.showData);
    }

    setBookingID0()
    {
        for(var i = 0; i < this.booking.seatPlan.rows.length ; i++)
        {
          //  this.booking.seatPlan.rows[i].payment_id = this.booking.seatPlan.rows[i].s.slice();
          this.booking.seatPlan.rows[i].payment_id = [];
          for(var j = 0; j < this.booking.seatPlan.rows[i].s.length; j++)
          {
            this.booking.seatPlan.rows[i].payment_id[j] = '0';
          }
        }
    }

    setBookingVar()
    {
        //select the ith cinema data start
        for(var i =0; i < this.allMovies.length; i++ )
        {
              if ( this.allCinemas[i]._id === this.showData.slot_id)
              {
                var ci= this.allCinemas[i];
                this.booking  = JSON.parse(JSON.stringify( ci ));
                break;
              }
        }

        //select the cinema data start
        this.setBookingID0();

        // set movie and date in booking //
        this.booking.movie = this.allMovies[this.showData.movie_i].Title;
        this.booking.imdbID = this.allMovies[this.showData.movie_i].imdbID;
        this.booking.bdate = this.showData.bdate.toJSON().substr(0,10);
    }

    //the function call setting data for Add/POST
    selectSlot()
    {
      this.setBookingVar();
      this.socket.syncUpdates('schedule-booking', this.booking);
    }

    updateAllBookingNClear()
    {
          var cp = JSON.parse( JSON.stringify( this.booking ));
          this.booking = {};
          this.showData = {};
          this.allBookings.unshift(cp);
          this.socket.syncUpdates('schedule-booking', this.allBooking);
          // this.socket.syncUpdates('schedule-booking', this.booking);
          // this.socket.syncUpdates('schedule-booking', this.showData);
    }

// code to prepare data in response to page ENDS //

      // code CRUD starts //
      addBooking() {
        var cp = angular.copy(this.booking);
        delete cp._id;
        if (this.booking.bdate) {
              this.$http.post('/api/bookings', angular.toJson(cp) );
              this.updateAllBookingNClear();
        }
      }

      deleteBooking(_bid, i)
      {
          if(_bid){
              this.$http.delete('/api/bookings/' + _bid);
          }
          this.allBookings.splice(i,1);
          this.socket.syncUpdates('schedule-booking', this.allBookings);
      }

      // code CRUD ends //
}//end class ScheduleBookingComponent

angular.module('meraFilmsApp')
  .component('scheduleBooking', {
    templateUrl: 'app/schedule-booking/schedule-booking.html',
    controller: ScheduleBookingComponent
  });

})();
