/**
 * Seat model events
 */

'use strict';

import {EventEmitter} from 'events';
import Seat from './seat.model';
var SeatEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeatEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Seat.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SeatEvents.emit(event + ':' + doc._id, doc);
    SeatEvents.emit(event, doc);
  }
}

export default SeatEvents;
