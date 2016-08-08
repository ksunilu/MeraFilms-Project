'use strict';

(function(){

class PaymentComponent {
  constructor($http, $scope, $rootScope, $location ,socket) {
    this.showData = {};
    this.backData = {};

    this.backData.cardTypes = ['Amex', 'Discover', 'American Express ',
                                'Diners Club ', 'Discover ', 'JCB ', 'Mastercard ', 'Visa '];

    this.$http = $http;
    this.socket = socket;
    this.$rootScope = $rootScope;
    this.bookingShowData = $rootScope.bookingShowData;
    // .selectTotal

    this.$location = $location;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('payment');
    });
  }//end constructor

  addPayment() {
    this.showData.pdate = new Date().toJSON().slice(0,10);
    this.showData.total =this.bookingShowData.selectTotal;

    if (this.showData.name) {
      this.$http.post('/api/payments',
        // JSON.stringify(this.showData)
        angular.toJson(this.showData)
      );
    }
    this.$location.path('/print');
  }


}// end class PaymentComponent

angular.module('meraFilmsApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent
  });

})();
