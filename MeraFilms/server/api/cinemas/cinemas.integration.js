'use strict';

var app = require('../..');
import request from 'supertest';

var newCinemas;

describe('Cinemas API:', function() {

  describe('GET /api/cinemass', function() {
    var cinemass;

    beforeEach(function(done) {
      request(app)
        .get('/api/cinemass')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cinemass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cinemass).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cinemass', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cinemass')
        .send({
          name: 'New Cinemas',
          location: 'New Location',
          address: 'New Address',
          info: 'This is the brand new cinemas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCinemas = res.body;
          done();
        });
    });

    it('should respond with the newly created cinemas', function() {
      expect(newCinemas.name).to.equal('New Cinemas');
      expect(newCinemas.info).to.equal('This is the brand new cinemas!!!');
    });

  });

  describe('GET /api/cinemass/:id', function() {
    var cinemas;

    beforeEach(function(done) {
      request(app)
        .get('/api/cinemass/' + newCinemas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cinemas = res.body;
          done();
        });
    });

    afterEach(function() {
      cinemas = {};
    });

    it('should respond with the requested cinemas', function() {
      expect(cinemas.name).to.equal('New Cinemas');
      expect(cinemas.info).to.equal('This is the brand new cinemas!!!');
    });

  });

  describe('PUT /api/cinemass/:id', function() {
    var updatedCinemas;

    beforeEach(function(done) {
      request(app)
        .put('/api/cinemass/' + newCinemas._id)
        .send({
          name: 'Updated Cinemas',
          info: 'This is the updated cinemas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCinemas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCinemas = {};
    });

    it('should respond with the updated cinemas', function() {
      expect(updatedCinemas.name).to.equal('Updated Cinemas');
      expect(updatedCinemas.info).to.equal('This is the updated cinemas!!!');
    });

  });

  describe('DELETE /api/cinemass/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cinemass/' + newCinemas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cinemas does not exist', function(done) {
      request(app)
        .delete('/api/cinemass/' + newCinemas._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
