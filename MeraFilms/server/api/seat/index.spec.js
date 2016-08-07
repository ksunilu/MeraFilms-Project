'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatCtrlStub = {
  index: 'seatCtrl.index',
  show: 'seatCtrl.show',
  create: 'seatCtrl.create',
  update: 'seatCtrl.update',
  destroy: 'seatCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seat.controller': seatCtrlStub
});

describe('Seat API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatIndex).to.equal(routerStub);
  });

  describe('GET /  ', function() {

    it('should route to seat.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /  /:id', function() {

    it('should route to seat.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /  ', function() {

    it('should route to seat.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /  /:id', function() {

    it('should route to seat.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /  /:id', function() {

    it('should route to seat.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /  /:id', function() {

    it('should route to seat.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
