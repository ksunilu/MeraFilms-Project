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

    // applyFilter()
    // {
    //
    // }
    //
    // forceApplyFilter()
    // {
    //
    // }

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
        });
        //get all movies
        this.$http.get('/api/movies')
          .then(response => {
            this.allMovies = response.data;
            this.socket.syncUpdates('main', this.allMovies);
        });
    }


  }//end class MainController
  angular.module('meraFilmsApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
