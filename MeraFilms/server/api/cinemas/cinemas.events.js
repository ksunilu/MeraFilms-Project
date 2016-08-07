/**
 * Cinemas model events
 */

'use strict';

import {EventEmitter} from 'events';
import Cinemas from './cinemas.model';
var CinemasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CinemasEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cinemas.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CinemasEvents.emit(event + ':' + doc._id, doc);
    CinemasEvents.emit(event, doc);
  }
}

export default CinemasEvents;
