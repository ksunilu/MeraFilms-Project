'use strict';

(function(){

class SeatComponent {
  constructor($http, $scope, socket) {
    this.seatData = {};

    this.$http = $http;
    this.socket = socket;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movie');
    });
  }// end constructor
  $onInit() {
    this.$http.get('/api/seats/200')
      .then(response => {
        this.seatData= response.data;
        this.socket.syncUpdates('seat', this.seatData);
      });
  }


}// end class SeatComponent

angular.module('meraFilmsApp')
  .component('seat', {
    templateUrl: 'app/seat/seat.html',
    controller: SeatComponent
  });

})();
