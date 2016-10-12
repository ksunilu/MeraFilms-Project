'use strict';

(function(){

class ShowingComponent {
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.socket = socket;
    this.$routeParams = $routeParams;

    this.showing = {};
    this.showing.imdbID =  $routeParams.imdbID;
    this.selectedMovie={};
    this.allBookings={};

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movie');
    });
  }//end constructor
  $onInit() {
      this.$http.get('/api/bookings')
      .then(response => {
        this.allBookings = response.data;
        this.socket.syncUpdates('schedule-booking', this.allBookings);
      });
      this.getMovie(this.showing.imdbID);
  }

  getMovie(imdbID)
  {
    this.$http.get('/api/movies/' + imdbID)
      .then(response => {
        this.selectedMovie = response.data;
        this.socket.syncUpdates('booking', this.selectedMovie);
      });
  }

  getStarClass(val,star)
  {
    if(val < star ){return 'glyphicon glyphicon-star-empty';}
    else {return 'glyphicon glyphicon-star';}
  }


}//end class ShowingComponent

angular.module('meraFilmsApp')
  .component('showing', {
    templateUrl: 'app/showing/showing.html',
    controller: ShowingComponent
  });

})();
