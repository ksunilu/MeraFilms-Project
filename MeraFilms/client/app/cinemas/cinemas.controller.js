'use strict';
(function() {

  class CinemasComponent {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeCinema = [];
      this.seatCount = null;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('cinemas');
      });
    }

    $onInit() {
      //get all cinemas from db //
      this.$http.get('/api/cinemass')
        .then(response => {
          this.awesomeCinema = response.data;
          this.socket.syncUpdates('cinemas', this.awesomeCinema);
        });

      //get all seats from db //
      this.$http.get('/api/seats/')
        .then(response => {
          this.allSeats = response.data;
          this.socket.syncUpdates('cinemas', this.allSeats);
        });
    }

    ShowSeats(){
          this.setSeatData();
    }

    setSeatData()
    {
      // this.sunilx = 'setSeatData starts';
      for(var i = 0; i < this.allSeats.length; i++)
      {
        if(this.allSeats[i].count === this.seats )
          {
             this.seatData = this.allSeats[i];
             break;
          }
      }
      // if (this.seatData)  this.sunilx = this.seatData;
    }

    addCinemas() {
      this.setSeatData();
      var myData = {
        name: this.name,
        location: this.location,
        address: this.address,
        screen: this.screen,
        slot: this.slot,
        seats: this.seats,
        seatPlan: this.seatData
      };

        this.$http.post('/api/cinemass', angular.toJson(myData) );
        this.name='';
        this.location='';
        this.address='';
        this.screen='';
        this.seats='';
        this.slot='';
        this.seatData={};
    }

    showCinema(i){
      this._id = this.awesomeCinema[i]._id;
      this.name = this.awesomeCinema[i].name;
      this.location=this.awesomeCinema[i].location;
      this.address=this.awesomeCinema[i].address;
      this.slot=this.awesomeCinema[i].slot;
      this.screen=this.awesomeCinema[i].screen;
      this.seats=this.awesomeCinema[i].seats;
      this.seatData = this.awesomeCinema[i].seatPlan;

      this.socket.syncUpdates('movie', this.name);
      this.socket.syncUpdates('movie', this.location);
      this.socket.syncUpdates('movie', this.address);
      this.socket.syncUpdates('movie', this.slot);
      this.socket.syncUpdates('movie', this.screen);
      this.socket.syncUpdates('movie', this.seats);
      this.socket.syncUpdates('movie', this.seatData);
    }

    deleteThing() {
      this.$http.delete('/api/cinemass/' + this._id);
    }

    updateThing() {
        this.setSeatData();
        var myData = {
          name: this.name,
          location: this.location,
          address: this.address,
          screen: this.screen,
          slot: this.slot,
          seats: this.seats,
          seatPlan: this.seatData
        };

          this.$http.put('/api/cinemass/' + this._id, angular.toJson(myData) );
    }

  }//end class MainController

  angular.module('meraFilmsApp')
    .component('cinemas', {
      templateUrl: 'app/cinemas/cinemas.html',
      controller: CinemasComponent
  });//end angular.module('meraFilmsApp')

})();
