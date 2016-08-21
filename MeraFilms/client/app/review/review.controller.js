'use strict';

(function(){

class ReviewComponent {
  constructor($http, $scope, socket) {
    this.allMovies = [];
    this.showData = {};
    this.fm = {};
    this.showData.vshowMore = [];
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('review');
    });
  }//end constructor
  $onInit() {
      this.$http.get('/api/movies')
        .then(response => {
          this.allMovies = response.data;
          this.socket.syncUpdates('review', this.allMovies);
      });
  }

  showMore(mov)
  {
    if (typeof mov.isReview !== 'undefined' && mov.isReview)
    {
    mov.isReview = !(mov.isReview);
    }
    else {
      mov.isReview = true;
    }

    if (!(typeof mov.reviews !== 'undefined' && mov.reviews) )
    {
      mov.reviews  = [];
    }
  }
  getStarClass(val,star)
  {
    if(val < star ){return 'glyphicon glyphicon-star-empty';}
    else {return 'glyphicon glyphicon-star';}
  }

  addReview(mov)
  {
    var revObj = angular.copy({reviewer : this.fm.reviewer,
          reviewText : this.fm.reviewText,
          star : this.fm.star
        });
        this.fm={};
        this.fm.star=3;
    // mov.reviews[l] = revObj;
    mov.reviews.push(revObj);
    this.getStar(mov);
    // this.$http.get('/api/movies')
    this.$http.put('/api/movies/' + mov._id, angular.toJson(mov) );
  }

  setTrailer(mov,i)
  {
    this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + mov.Title + '-trailer&key=AIzaSyBT_yauMryVu4uYY5X_85HFPmxDIIGr498')
       .then(response => {
    var trailer_id=response.data.items[0].id.videoId;
    var trailer='https://www.youtube.com/embed/'+trailer_id;
    document.getElementById('player'+i).setAttribute('src',trailer);
    // mov.trailer = 'https://www.youtube.com/embed/'+ response.data.items[0].id.videoId;
    });
  }

  getStar(mov)
  {
    if ( mov.reviews.length > 0)
    {
        var sum=0;
        for(var i = 0; i < mov.reviews.length; i++)
        {
          sum += parseInt(mov.reviews[i].star);
        }
        mov.star = (sum/mov.reviews.length);
    }
    else {
        mov.star = 3;
    }
    mov.star = parseInt( mov.star );
    return mov.star;
  }
}// end class

angular.module('meraFilmsApp')
  .component('review', {
    templateUrl: 'app/review/review.html',
    controller: ReviewComponent
  });

})();
