'use strict';

import mongoose from 'mongoose';

var BookingSchema = new mongoose.Schema({
        bdate : String,
        movie : String,
        imdbID : String,
        // cinema theater part //
        name: String,
        location: String,
        address: String,
        screen: String,
        slot: String,
        seats: String,
        seatPlan: {
            "name" : String,
            "price" : String,
            "count" : String,
            "rows" : [ {"rn" : String,"s" : [ String ], payment_id: [String]  } ]
        }
});

export default mongoose.model('Booking', BookingSchema);
