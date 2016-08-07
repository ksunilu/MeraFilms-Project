'use strict';

import mongoose from 'mongoose';

var PaymentSchema = new mongoose.Schema({
  name: String,
  type: String,
  number: String,
  cvv: String,
  expiry: String,
  pdate : String,
  total : String
});

export default mongoose.model('Payment', PaymentSchema);
