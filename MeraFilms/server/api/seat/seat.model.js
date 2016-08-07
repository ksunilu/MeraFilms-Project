'use strict';

import mongoose from 'mongoose';

// var SeatSchema = new mongoose.Schema({
//   name: String,
//   info: String,
//   active: Boolean
// });

var SeatSchema = new mongoose.Schema({
  "name" : String,
  "price" : String,
  "count" : String,
  "rows" : [ {"rn" : String,"s" : [ String ] } ]
});




export default mongoose.model('Seat', SeatSchema);
