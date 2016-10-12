  'use strict';

(function() {
  class MainController {
    constructor($http, $scope, socket) {
      this.allBookings = [];
      this.allMovies = [];
      this.myFilter ='';
      this.showData = {};

      this.$http = $http;
      this.socket = socket;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('main');
      });
    }//end constructor
    getStarClass(val,star)
    {
      if(val < star ){return 'glyphicon glyphicon-star-empty';}
      else {return 'glyphicon glyphicon-star';}
    }
    clearFilter()
    {
      this.showData = {};
    }
    $onInit() {
      this.getAllBookings();
    }// end $onInit

    getAllBookings()
    {
      this.$http.get('/api/bookings')
        .then(response => {
          this.allBookings = response.data;
          this.socket.syncUpdates('main', this.allBookings);
        })
        .then(
          response => {
            this.$http.get('/api/movies')
              .then(response => {
                var allMovies = response.data;
                this.allMovies = this.filteredMovie(allMovies);
                this.socket.syncUpdates('main', this.allMovies);
              });
        });
        //get all movies
    }

    filteredMovie(movies)
    {
      var mov = [];
      for(var i = 0; i < movies.length; i++)
      {
        if(this.findBooking(movies[i].imdbID))
        {
          mov.push(movies[i]);
        }
      }
      return mov;
    }

    // markMovies()
    // {
    //   for(var i = 1; i < this.allMovies.length; i++ )
    //   {
    //     this.allMovies.Showing = findBooking(this.allMovies.imdbID);
    //   }
    // }
    
    findBooking(imdbID)
    {
      for(var i = 0; i < this.allBookings.length; i++ )
      {
        if(this.allBookings[i].imdbID === imdbID) return true;
      }
      return false;
    }
    // setMinMax()
    // {
    //
    //   var maxDate =this.allBookings[0].bdate;
    //   var minDate = this.allBookings[0].bdate;
    //   for(var i = 1; i < this.allBookings.length; i++ )
    //   {
    //     if(maxDate < this.allBookings[i].bdate){
    //       maxDate = this.allBookings[i].bdate;
    //     }
    //     if(minDate > this.allBookings[i].bdate){
    //       minDate  =this.allBookings[i].bdate;
    //     }
    //   }
    //   this.showData.maxDate = new Date(maxDate);
    //   this.showData.minDate = new Date(minDate);
    // }

  }//end class MainController
  angular.module('meraFilmsApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
