'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cinemasCtrlStub = {
  index: 'cinemasCtrl.index',
  show: 'cinemasCtrl.show',
  create: 'cinemasCtrl.create',
  update: 'cinemasCtrl.update',
  destroy: 'cinemasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cinemasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cinemas.controller': cinemasCtrlStub
});

describe('Cinemas API Router:', function() {

  it('should return an express router instance', function() {
    expect(cinemasIndex).to.equal(routerStub);
  });

  describe('GET /api/cinemass', function() {

    it('should route to cinemas.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cinemasCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cinemass/:id', function() {

    it('should route to cinemas.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cinemasCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cinemass', function() {

    it('should route to cinemas.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cinemasCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cinemass/:id', function() {

    it('should route to cinemas.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cinemasCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cinemass/:id', function() {

    it('should route to cinemas.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cinemasCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cinemass/:id', function() {

    it('should route to cinemas.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cinemasCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
