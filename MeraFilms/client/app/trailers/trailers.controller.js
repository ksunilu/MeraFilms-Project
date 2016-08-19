'use strict';

(function(){

class TrailersComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('meraFilmsApp')
  .component('trailers', {
    templateUrl: 'app/trailers/trailers.html',
    controller: TrailersComponent
  });

})();
