/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cinemass              ->  index
 * POST    /api/cinemass              ->  create
 * GET     /api/cinemass/:id          ->  show
 * PUT     /api/cinemass/:id          ->  update
 * DELETE  /api/cinemass/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Cinemas from './cinemas.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    console.log( JSON.stringify(updates) );
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Cinemass
export function index(req, res) {
  return Cinemas.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cinemas from the DB
export function show(req, res) {

  return Cinemas.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function showName(req, res) {
  return Cinemas.findOne({name: req.params.name}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//end showName


// Creates a new Cinemas in the DB
export function create(req, res) {
  return Cinemas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Cinemas in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Cinemas.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cinemas from the DB
export function destroy(req, res) {
  return Cinemas.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
