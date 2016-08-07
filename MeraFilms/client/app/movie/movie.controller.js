'use strict';

(function(){

class MovieComponent {
  constructor($http, $scope, socket) {
    this.movieData = [];
    this.oldI = -40;

    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movie');
    });
  }//end constructor


  $onInit() {
    this.$http.get('/api/movies')
      .then(response => {
        this.movieOldData= response.data;
        this.socket.syncUpdates('cinemas', this.movieOldData);
      });
  }

  clearMovie(){
      this.movieData=[];
      this.t ='';
      this.y ='';

      this.socket.syncUpdates('movie', this.movieData);
      this.socket.syncUpdates('movie', this.t);
      this.socket.syncUpdates('movie', this.y);
  }
  addMovie() {
    if (this.movieData) {
      this.$http.post('/api/movies',
        JSON.stringify(this.movieData)
      );
      this.$onInit();
    }
  }
  deleteMovie() {
    if(this.movieData){
      this.$http.delete('/api/movies/' + this.movieData._id);
      this.movieData = [];
      this.socket.syncUpdates('movie', this.movieData);
      this.$onInit();
    }
  }

  showMovie(i)
  {
    this.movieData = this.movieOldData[i];
    this.socket.syncUpdates('movie', this.movieData);
  }

  getOmdbMovie() {
    this.$http.get('http://www.omdbapi.com/?t=' + this.t + '&y='+this.y + '&plot=short&r=json')
      .then(response => {
        this.movieData = response.data;
        this.socket.syncUpdates('movie', this.movieData);
      });
  }
}//end class MovieComponent

angular.module('meraFilmsApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent
  });

})();
