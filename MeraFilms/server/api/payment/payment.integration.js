'use strict';

var app = require('../..');
import request from 'supertest';

var newPayment;

describe('Payment API:', function() {

  describe('GET /api/payments', function() {
    var payments;

    beforeEach(function(done) {
      request(app)
        .get('/api/payments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          payments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(payments).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/payments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/payments')
        .send({
          name: 'New Payment',
          info: 'This is the brand new payment!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPayment = res.body;
          done();
        });
    });

    it('should respond with the newly created payment', function() {
      expect(newPayment.name).to.equal('New Payment');
      expect(newPayment.info).to.equal('This is the brand new payment!!!');
    });

  });

  describe('GET /api/payments/:id', function() {
    var payment;

    beforeEach(function(done) {
      request(app)
        .get('/api/payments/' + newPayment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          payment = res.body;
          done();
        });
    });

    afterEach(function() {
      payment = {};
    });

    it('should respond with the requested payment', function() {
      expect(payment.name).to.equal('New Payment');
      expect(payment.info).to.equal('This is the brand new payment!!!');
    });

  });

  describe('PUT /api/payments/:id', function() {
    var updatedPayment;

    beforeEach(function(done) {
      request(app)
        .put('/api/payments/' + newPayment._id)
        .send({
          name: 'Updated Payment',
          info: 'This is the updated payment!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPayment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPayment = {};
    });

    it('should respond with the updated payment', function() {
      expect(updatedPayment.name).to.equal('Updated Payment');
      expect(updatedPayment.info).to.equal('This is the updated payment!!!');
    });

  });

  describe('DELETE /api/payments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/payments/' + newPayment._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when payment does not exist', function(done) {
      request(app)
        .delete('/api/payments/' + newPayment._id)
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
